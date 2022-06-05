import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import { Fragment } from 'react-bootstrap';

import { Button, Card, Col } from 'react-bootstrap';

import './profile-view.scss';

export function FavoriteMoviesView(props) {
	const { movies, favoriteMovies, currentUser, token } = props;

	const favoriteMoviesList = movies.filter((m) => {
		return favoriteMovies.includes(m._id);
	})

	const handleMovieDelete = (movieId) => {
		axios.delete(`https://cold-myflix-app.herokuapp.com/users/${currentUser}/movies/${movieId}`, {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then(() => {
				alert(`The movie was successfully deleted.`)
				window.open('/users/:username', '_self');
			}).
			catch(error => console.error(error))
	}

	return (
		<Fragment>
			{favoriteMoviesList.length === 0 ? (
				<p>You have not added any movies to your favorites yet. Head over to the movies list and click the heart icon to add them to your list!</p>
			) : (
				favoriteMoviesList.map((movie) => {
					return (
						<Col xs={10} sm={8} md={6} lg={4} key={movie._id}>
							<Card id="movie-card">
								<Link to={`/movies/${movie._id}`}>
									<Card.Img variant="top" src={movie.ImagePath} />
								</Link>
								<Card.Body>
									<Card.Title>{movie.Title}</Card.Title>
									<Card.Text>{movie.Description}</Card.Text>
									<Link to={`/movies/${movie._id}`}>
										<Button className="button" variant="outline-primary" size="sm">Open</Button>
									</Link>
									<Button
										className="button ml-2"
										variant="outline-primary"
										size="sm" onClick={() => { handleMovieDelete(movie._id) }} >
										Remove
									</Button>
								</Card.Body>
							</Card>
						</Col>
					)
				})
			)
			}
		</Fragment>
	)
}