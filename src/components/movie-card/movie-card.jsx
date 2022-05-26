import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container } from 'react-bootstrap';
import './movie-card.scss'


export class MovieCard extends React.Component {
	render() {
		const { movie, onMovieClick } = this.props;

		return (
			<Card id="movie-card" style={{ marginBottom: '1rem', marginTop: '1rem', marginRight: '1rem', marginLeft: '1rem' }}>
				<Card.Img id="movie-image" variant="top" src={movie.ImagePath} />
				<Card.Body>
					<Card.Title id="movie-title">{movie.Title}</Card.Title>
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
			Description: PropTypes.string
		}),
		Director: PropTypes.shape({
			Name: PropTypes.string,
			Bio: PropTypes.string
		}),
	}).isRequired,

	onMovieClick: PropTypes.func.isRequired,
};