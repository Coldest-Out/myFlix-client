import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import axios from 'axios';
import { Col, Row, Container, Button, Nav, Navbar } from 'react-bootstrap';

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
		let accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.setState({
				user: localStorage.getItem('user')
			});
			this.getMovies(accessToken);
		}
	}

	/*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
	setSelectedMovie(movie) {
		this.setState({
			selectedMovie: movie
		});
	}

	/* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
	onLoggedIn(authData) {
		console.log(authData);
		this.setState({
			user: authData.user.Username
		});

		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.user.Username);
		this.getMovies(authData.token);
	}

	onLoggedOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.setState({
			user: null
		});
	}

	onRegister(registered) {
		this.setState({
			registered
		});
	}

	getMovies(token) {
		axios.get('https://cold-myflix-app.herokuapp.com/movies', {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then(response => {
				//Assign the result to the state
				this.setState({
					movies: response.data
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	render() {
		const { movies, selectedMovie } = this.state;


		if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

		return (
			<>
				<Navbar>
					<Container>
						<Navbar.Brand href="#home">MyFlix-App</Navbar.Brand>
						<Navbar.Toggle />
						<Navbar.Collapse className="justify-content-end">
							<Button onClick={() => { this.onLoggedOut() }}>Logout</Button>
						</Navbar.Collapse>
					</Container>
				</Navbar>
				<Row className="main-view justify-content-md-center">
					{selectedMovie
						? (
							<Col md={8}>
								<MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
							</Col>
						)
						: movies.map(movie => (
							<Col key={movie._id} md={3} id="background">
								<MovieCard movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
							</Col>
						))
					}
				</Row></>
		);
	}
}

export default MainView;