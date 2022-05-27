import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Row, Col, Button } from 'react-bootstrap';
import './main-view.scss'

class MainView extends React.Component {

	constructor() {
		super();
		this.state = {
			movies: [],
			selectedMovie: null,
			registered: null,
			user: null
		}
	}

	componentDidMount() {
		axios.get('https://cold-myflix-app.herokuapp.com/movies')
			.then(response => {
				this.setState({
					movies: response.data
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	/*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
	setSelectedMovie(movie) {
		this.setState({
			selectedMovie: movie
		});
	}

	/* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
	onLoggedIn(user) {
		this.setState({
			user
		});
	}

	onRegister(registered) {
		this.setState({
			registered
		});
	}

	render() {
		const { movies, selectedMovie, user, registered } = this.state;

		if (registered) {
			return <RegistrationView onRegister={(register) => this.onRegister(register)} />;
		}

		/* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
		if (!user) {
			return (
				<LoginView
					onLoggedIn={(user) => this.onLoggedIn(user)}
				/>
			);
		}

		// Before the movies have been loaded
		if (movies.length === 0) return <div className="main-view" />;

		return (
			<Row className="main-view justify-content-md-center">
				{selectedMovie
					? (
						<Col md={8}>
							<MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
						</Col>
					)
					: movies.map(movie => (
						<Col md={3} id="background">
							<MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
						</Col>
					))
				}
			</Row>
		);
	}

}

export default MainView;