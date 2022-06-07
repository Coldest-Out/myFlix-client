import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, CardGroup, Card } from 'react-bootstrap';
import axios from 'axios';
import './login-view.scss';
import { Link, BrowserRouter } from 'react-router-dom';
import { RegistrationView } from '../registration-view/registration-view';

export function LoginView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	// Declare hook for each input
	const [usernameErr, setUsernameErr] = useState('');
	const [passwordErr, setPasswordErr] = useState('');

	// validate user inputs
	const validate = () => {
		let isReq = true;
		if (!username) {
			setUsernameErr('Username Required');
			isReq = false;
		} else if (username.length < 2) {
			setUsernameErr('Username must be 2 characters long');
			isReq = false;
		}
		if (!password) {
			setPasswordErr('Password Required');
			isReq = false;
		} else if (password.length < 6) {
			setPassword('Password must be 6 characters long');
			isReq = false;
		}

		return isReq;
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const isReq = validate();
		if (isReq) {
			/* Send request to the server for authentication */
			axios.post('https://cold-myflix-app.herokuapp.com/login', {
				Username: username,
				Password: password
			})
				.then(response => {
					const data = response.data;
					props.onLoggedIn(data);
				})
				.catch(e => {
					console.log('no such user')
				});
		}
	};

	return (
		<Container>
			<Row>
				<Col>
					<CardGroup>
						<Card style={{ marginTop: 100, marginBottom: 50, width: '30' }}>
							<Card.Body>
								<Card.Title style={{ textAlign: 'center', fontSize: '2rem', margin: '2rem' }}>Welcome! Login Below!</Card.Title>
								<Form>
									<Form.Group controlId="formUsername">
										<Form.Label>Username:</Form.Label>
										<Form.Control
											type="text"
											onChange={e => setUsername(e.target.value)}
											placeholder="Enter your username" />
										{usernameErr && <p>{usernameErr}</p>}
									</Form.Group>

									<Form.Group controlId="formPassword">
										<Form.Label>Password:</Form.Label>
										<Form.Control
											type="password"
											onChange={e => setPassword(e.target.value)}
											placeholder="Your password must be at least 6 characters" />
										{passwordErr && <p>{passwordErr}</p>}
									</Form.Group>
									<Button style={{ marginTop: '1rem', color: 'white', background: 'black', borderColor: 'black' }}
										variant="primary"
										type="submit"
										onClick={handleSubmit}>
										Login
									</Button>
									<Button
										style={{
											color: "white",
											background: "maroon",
											marginLeft: "1rem",
											marginTop: "1rem",
											borderColor: "maroon",
										}}>
										<Link to={"/register"}>Register</Link>
									</Button>
								</Form>
							</Card.Body>
						</Card>
					</CardGroup>
				</Col>
			</Row>
		</Container>
	);
}