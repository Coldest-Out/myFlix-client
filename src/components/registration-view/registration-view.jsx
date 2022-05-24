import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, CardGroup, Card } from 'react-bootstrap';

export function RegistrationView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, password, email, birthday);
		props.onRegister(false);
	};

	return (
		<Container>
			<Row>
				<Col>
					<CardGroup>
						<Card>
							<Card.Body>
								<Card.Title>Please Register Below!</Card.Title>
								<Form>
									<Form.Group>
										<Form.Label>Username:</Form.Label>
										<Form.Control
											type="text"
											value={username}
											onChange={e => setUsername(e.target.value)}
											required
											placeholder="Enter a username" />
									</Form.Group>

									<Form.Group>
										<Form.Label>Password:</Form.Label>
										<Form.Control
											type="password"
											value={password}
											onChange={e => setPassword(e.target.value)}
											required
											minLength='8' />
									</Form.Group>

									<Form.Group>
										<Form.Label>Email:</Form.Label>
										<Form.Control
											type="email"
											value={email}
											onChange={e => setEmail(e.target.value)}
											required />
									</Form.Group>
									<Button variant="primary" type="submit"
										onClick={handleSubmit}>Submit
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