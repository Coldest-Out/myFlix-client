import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, CardGroup, Card } from 'react-bootstrap';

export function LoginView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, password);
		/* Send a request to the server for authentication */
		/* then call props.onLoggedIn(username) */
		props.onLoggedIn(username);
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
											required
											placeholder="Enter your username" />
									</Form.Group>

									<Form.Group controlId="formPassword">
										<Form.Label>Password:</Form.Label>
										<Form.Control
											type="password"
											onChange={e => setPassword(e.target.value)}
											required
											placeholder="Your password must be at least 8 characters" />
									</Form.Group>
									<Button style={{ marginTop: '1rem', color: 'white', background: 'black', borderColor: 'black' }}
										variant="primary"
										type="submit"
										onClick={handleSubmit}>
										Submit
									</Button>
									<Button style={{ color: 'white', background: 'red', marginLeft: '1rem', marginTop: '1rem', borderColor: 'red' }}
										variant="primary"
										type="submit"
										onClick={handleSubmit}>
										Register
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