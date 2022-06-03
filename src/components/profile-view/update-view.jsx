import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Row, Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export function UpdateView(props) {

	const baseURL = 'https://cold-myflix-app.herokuapp.com/';
	const accessToken = localStorage.getItem('token');

	const [user, setUser] = useState(props.user)
	const [updateUser, setUpdateUser] = useState(props.user);

	const handleUpdate = (e) => {
		console.log(user)
		setUpdateUser({
			...updateUser,
			[e.target.name]: e.target.value
		});
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.put(baseURL + 'users/' + user.Username + '/update',
			{
				Username: updateUser.Username,
				Password: updateUser.Password,
				Email: updateUser.Email,
				Birthday: updateUser.Birthday
			}, { headers: { Authorization: `Bearer ${accessToken}` } })
			.then(response => {
				console.log('response.data');
				console.log(response.data);
				localStorage.setItem('user', response.data.Username);
				setUser(response.data)
				window.open("/profile", "_self");
			})
			.catch(error => {
				console.log(error);
			})
	}

	return (
		<>
			<Row className="justify-content-center my-5">
				<Col md={6} className="">
					<Form className="justify-content-center my-3">
						<Form.Group controlId="formUsername" className="mb-3">
							<Form.Label>Username:</Form.Label>
							<Form.Control
								type="text"
								value={updateUser.Username}
								name="Username"
								onInput={(e) => handleUpdate(e)}
							/>
						</Form.Group>

						<Form.Group controlId="formPassword" className="mb-3">
							<Form.Label>Password:</Form.Label>
							<Form.Control
								type="password"
								name="Password"
								//value={updateUser.Password}
								onChange={(e) => handleUpdate(e)}
							/>
						</Form.Group>

						<Form.Group controlId="formEmail" className="mb-3">
							<Form.Label>Email:</Form.Label>
							<Form.Control
								type="email"
								name="Email"
								value={updateUser.Email}
								onChange={(e) => handleUpdate(e)}
							/>
						</Form.Group>

						<Form.Group controlId="formBirthday" className="mb-3">
							<Form.Label>Birthday:</Form.Label>
							<Form.Control
								type="date"
								value={updateUser.Birthday}
								name="Birthday"
								onChange={(e) => handleUpdate(e)}
							/>
						</Form.Group>

						<Button variant="primary" type="submit" onClick={handleSubmit}>
							Update Profile
						</Button>
					</Form>
				</Col>
			</Row>
		</>
	)
}