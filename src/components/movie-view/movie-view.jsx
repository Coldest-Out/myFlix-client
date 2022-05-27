import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Container, Row, Button } from "react-bootstrap";

class MovieView extends React.Component {

	render() {
		const { movie, onBackClick } = this.props;

		return (
			<div className="movie-view">
				<div className="movie-poster">
					<img src={movie.ImagePath} />
				</div>
				<div className="movie-title">
					<span className="label">Title: </span>
					<span className="value">{movie.Title}</span>
				</div>
				<div className="movie-description">
					<span className="label">Description: </span>
					<span className="value">{movie.Description}</span>
				</div>
				<div className="movie-genre">
					<span className="label">Genre: </span>
					<span className="value">{movie.Genre.Name}</span>
				</div>
				<div className="movie-director">
					<span className="label">Director: </span>
					<span className="value">{movie.Director}</span>
				</div>
				<button onClick={() => { onBackClick(null); }}>Back</button>
				<button onClick={() => { onBackClick(null); }}>Add to Favorites</button>
				<button onClick={() => { onBackClick(null); }}>Remove from Favorites</button>

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

export default MovieView;