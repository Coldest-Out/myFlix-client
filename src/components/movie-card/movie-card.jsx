import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';


export class MovieCard extends React.Component {
	render() {
		const { movie, onMovieClick } = this.props;

		return (
			<Card id="movie-card">
				<Card.Img id="movie-image" variant="top" src={movie.ImagePath} />
				<Card.Body>
					<Card.Title id="movie-title">{movie.Title}</Card.Title>
					<Card.Text id="movie-genre">{movie.Description}</Card.Text>
					<Button id="open-button" onClick={() => onMovieClick(movie)} variant="link">Open</Button>
				</Card.Body>
			</Card>
		);
	}
}

MovieCard.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
		Genre: PropTypes.shape({
			Name: PropTypes.string,
		}),
		Director: PropTypes.shape({
			Name: PropTypes.string,
		}),
	}).isRequired,

	onMovieClick: PropTypes.func.isRequired,
};