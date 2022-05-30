import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Row } from 'react-bootstrap';

import { Link } from "react-router-dom";

import './movie-card.scss'

export class MovieCard extends React.Component {
	render() {
		const { movie } = this.props;

		return (
			<Card id="movie-card">
				<Card.Img id="movie-image" variant="top" src={movie.ImagePath} />
				<Card.Body>

					<Card.Title id="card-title" >{movie.Title}</Card.Title>
					<Row>
						<Link to={`/movies/${movie._id}`}>
							<Button id="open-button" variant="link">Open</Button>
						</Link>
					</Row>
					<Row>
						<Link to={`/directors/${movie.Director.Name}`}>
							<Button id="open-button" variant="link">Director</Button>
						</Link>
					</Row>
					<Row>
						<Link to={`/genres/${movie.Genre.Name}`}>
							<Button id="open-button" variant="link">Genre</Button>
						</Link>
					</Row>
				</Card.Body>
			</Card>
		);
	}
}

MovieCard.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
		ImagePath: PropTypes.string.isRequired,
		Director: PropTypes.shape({
			Name: PropTypes.string.isRequired,
			Bio: PropTypes.string.isRequired,
			Birth: PropTypes.string.isRequired,
			Death: PropTypes.string
		}),
		Genre: PropTypes.shape({
			Name: PropTypes.string.isRequired,
			Description: PropTypes.string.isRequired
		})
	}).isRequired,
};