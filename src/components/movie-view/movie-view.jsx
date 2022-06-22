import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { BsFillHeartFill } from 'react-icons/bs';
import './movie-view.scss'

export class MovieView extends React.Component {

	addToFavoriteList(movieId) {
		const currentUser = localStorage.getItem('user');
		const token = localStorage.getItem('token');
		axios.post(`https://cold-myflix-app.herokuapp.com/users/${currentUser}/movies/${movieId}`,
			{},
			{
				headers: { Authorization: `Bearer ${token}` }
			})
			.then((response) => {
				console.log(response.data)
				alert(`The movie was successfully add to your list.`)
			}).
			catch(error => console.error(error))
	}

	render() {
		const { movie, onBackClick } = this.props;

		return (
			<div className="movie-view" style={{ marginBottom: '1rem', marginTop: '1rem', marginRight: '1rem', marginLeft: '1rem' }}>
				<div className="movie-poster">
					<img id="movie__img" crossorigin="anonymous" src={movie.ImagePath} />
				</div><br />
				<div className="movie-title">
					<span className="movie__title">{movie.Title}</span>
				</div><br />
				<div className="movie-description">
					<span className="movie__header">Description: </span>
					<span className="movie__text">{movie.Description}</span>
				</div>
				<div className="movie-genre">
					<span className="movie__header">Genre: </span>
					<span className="movie__text">{movie.Genre.Name}</span>
				</div>
				<div className="movie-director">
					<span className="movie__header">Director: </span>
					<span className="movie__text">{movie.Director.Name}</span>
				</div>
				<Button id="back-button" onClick={() => { onBackClick(null); }}>Back</Button>
				<Button id="open-button" onClick={() => this.addToFavoriteList(movie._id)} variant="outline-primary"><BsFillHeartFill /></Button>


			</div>
		);
	}
}

MovieView.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
		Genre: PropTypes.shape({
			Name: PropTypes.string.isRequired,
			Description: PropTypes.string.isRequired
		}).isRequired,
		Director: PropTypes.shape({
			Name: PropTypes.string.isRequired,
			Bio: PropTypes.string.isRequired,
		})
	}).isRequired,
	onBackClick: PropTypes.func.isRequired
};