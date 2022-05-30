import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

import { BrowserRouter as Router, Route } from "react-router-dom";
import './main-view.scss';
import { Col, Row, Container, Button, Nav, Navbar } from 'react-bootstrap';

class MainView extends React.Component {

	constructor() {
		super();
		this.state = {
			movies: [],
			user: null
		};
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
		const { movies, user } = this.state;

		if (!user) return <Row>
			<Col>
				<LoginView onLoggedIn={user => this.onLoggedIn(user)} />
			</Col>
		</Row>
		if (movies.length === 0) return <div className="main-view" />;

		return (
			<>
				<Navbar>
					<Container>
						<Navbar.Brand href="#home">MyFlix-App</Navbar.Brand>
						<Navbar.Toggle />
						<Navbar.Collapse className="justify-content-end">
							<Button id="open-button" onClick={() => { this.onLoggedOut() }}>Logout</Button>
						</Navbar.Collapse>
					</Container>
				</Navbar>
				<Router>
					<Row className="main-view justify-content-md-center">
						<Route exact path="/" render={() => {
							if (!user) return <Col>
								<LoginView onLoggedIn={user => this.onLoggedIn(user)} />
							</Col>
							if (movies.length === 0) return <div className="main-view" />;
							return movies.map(m => (
								<Col id="background" sm={6} md={4} lg={3} key={m._id} >
									<MovieCard movie={m} />
								</Col>
							))
						}} />

						<Route path="/login" render={() => {
							if (user) return <Redirect to="/" />
							return <Col md={8}>
								<LoginView />
							</Col>
						}} />

						<Route path="/users" render={() => {
							if (user) return <Redirect to="/" />
							return <Col md={8}>
								<RegistrationView />
							</Col>
						}} />

						<Route path="/movies/:movieId" render={({ match, history }) => {
							if (!user) return <Col>
								<LoginView onLoggedIn={user => this.onLoggedIn(user)} />
							</Col>
							if (movies.length === 0) return <div className="main-view" />;
							return <Col md={8}>
								<MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
							</Col>
						}} />

					</Row>
				</Router></>
		);
	}
}

export default MainView;