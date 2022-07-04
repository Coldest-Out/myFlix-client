import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, CardGroup, Card, Link } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

export function RegistrationView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');
	const [values, setValues] = useState({
		usernameErr: '',
		passwordErr: '',
		emailErr: '',
		birthdayErr: '',
	});

	// validate user inputs
	const validate = () => {
		let isReq = true;
		if (!username) {
			setValues({ ...values, usernameErr: 'Username required' });
			isReq = false;
		} else if (username.length < 2) {
			setValues({ ...values, usernameErr: 'Username must be at least 2 characters long' });
			isReq = false;
		}
		if (!password) {
			setValues({ ...values, passwordErr: 'Password required' });
			isReq = false;
		} else if (password.length < 6) {
			setValues({ ...values, passwordErr: 'Password must be at least 6 characters long' });
			isReq = false;
		}
		if (!email) {
			setValues({ ...values, emailErr: 'Email required' });
			isReq = false;
		} else if (email.indexOf('@') === -1) {
			setValues({ ...values, emailErr: 'Enter valid email' });
			isReq = false;
		}
		if (!birthday) {
			setValues({ ...values, birthdayErr: 'Date of Birth required' });
			isReq = false;
		} else if (birthday.input !== null) {
			setValues({ ...values, birthdayErr: 'Enter valid Date of Birth' });
		}
		return isReq;
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const isReq = validate();
		if (isReq) {
			axios.post('https://cold-myflix-app.herokuapp.com/register', {
				Username: username,
				Password: password,
				Email: email,
				Birthday: birthday
			})
				.then(response => {
					const data = response.data;
					console.log(data);
					alert('Registration successful, please login.');
					window.open('/', '_self');
				})
				.catch(e => {
					console.log('Error');
					alert('Unable to register');
				});
		}
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
									<Form.Group controlId="formUsername" className="reg-form-inputs">
										<Form.Label>Username:</Form.Label>
										<Form.Control
											type="text"
											value={username}
											onChange={e => setUsername(e.target.value)}
											placeholder="Enter a username" />
										{values.usernameErr && <p>{values.usernameErr}</p>}
									</Form.Group>

									<Form.Group controlId="formPassword" className="reg-form-inputs">
										<Form.Label>Password:</Form.Label>
										<Form.Control
											type="password"
											value={password}
											onChange={e => setPassword(e.target.value)} />
										{values.passwordErr && <p>{values.passwordErr}</p>}
									</Form.Group>

									<Form.Group controlId="Email" className="reg-form-inputs">
										<Form.Label>Email:</Form.Label>
										<Form.Control
											type="email"
											value={email}
											onChange={e => setEmail(e.target.value)} />
										{values.emailErr && <p>{values.emailErr}</p>}
									</Form.Group>

									<Form.Group controlId="updateBirthday" className="reg-form-inputs">
										<Form.Label>Birthday</Form.Label>
										<Form.Control
											type="date"
											value={birthday}
											onChange={e => setBirthday(e.target.value)} />
										{values.birthdayErr && <p>{values.birthdayErr}</p>}
									</Form.Group>
									<Button id="open-button" variant="primary" type="submit"
										onClick={handleSubmit}>Register
									</Button>
									<p></p>
									<p>Already Registered? <Link id="open-button" to={'/'}>Login</Link> here</p>
								</Form>
							</Card.Body>
						</Card>
					</CardGroup>
				</Col>
			</Row>
		</Container>
	);
}

RegistrationView.propTypes = {
	register: PropTypes.shape({
		Username: PropTypes.string.isRequired,
		Password: PropTypes.string.isRequired,
		Email: PropTypes.string.isRequired,
		Birthday: PropTypes.string
	}),
};