import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { Redirect } from 'react-router-dom';
import { NavbarView } from '../navbar-view/navbar';

import { BrowserRouter as Router, Route } from "react-router-dom";
import './main-view.scss';
import { Col, Row } from 'react-bootstrap';

class MainView extends React.Component {

	constructor() {
		super();
		this.state = {
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

	getMovies(token) {
		axios.get('https://cold-myflix-app.herokuapp.com/movies', {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then(response => {
				this.props.setMovies(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	render() {
		let { movies } = this.props;
		let { user } = this.state;

		return (

			<Router>
				<NavbarView user={user} />
				<Row className="main-view justify-content-md-center">
					<Route exact path="/" render={() => {
						if (!user) return <Col>
							<LoginView onLoggedIn={user => this.onLoggedIn(user)} />
						</Col>
						if (movies.length === 0) return <div className="main-view" />;
						return <MoviesList movies={movies} />;
					}} />

					<Route path="/login" render={() => {
						if (user) return <Redirect to="/" />
						return <Col md={8}>
							<LoginView />
						</Col>
					}} />

					<Route path="/register" render={() => {
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

					<Route path="/directors/:name" render={({ match, history }) => {
						if (!user) return <Col>
							<LoginView onLoggedIn={user => this.onLoggedIn(user)} />
						</Col>
						if (movies.length === 0) return <div className="main-view" />;
						return <Col md={8}>
							<DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
						</Col>
					}} />

					<Route path="/genres/:name" render={({ match, history }) => {
						if (!user) return <Col>
							<LoginView onLoggedIn={user => this.onLoggedIn(user)} />
						</Col>
						if (movies.length === 0) return <div className="main-view" />;
						return <Col md={8}>
							<GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
						</Col>
					}} />

					<Route path="/users/:username" render={({ match, history }) => {
						if (!user) return <Col>
							<LoginView onLoggedIn={user => this.onLoggedIn(user)} />
						</Col>
						if (movies.length === 0) return <div className="main-view" />;
						if (!user) return <Redirect to="/" />
						return <Col md={8}>
							<ProfileView movies={movies} user={user === match.params.username} onBackClick={() => history.goBack()} />
						</Col>
					}} />

				</Row>
			</Router>
		);
	}
}

let mapStateToProps = state => {
	return { movies: state.movies, user: StorageEvent.user }
}

//Commented out because of console error "Invalid value of type object for mergeProps argument when connecting component MainView"
/*
const mapDispatchToProps = dispatch => {
	return {
		setUser: (user) => {
			dispatch(setUser(user))
		},
		setMovies: (movies) => {
			dispatch(setMovies(movies))
		}
	}
}
*/

export default connect(mapStateToProps, /* mapDispatchToProps,*/ { setMovies })(MainView);