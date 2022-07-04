import React, { Fragment } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

export function NavbarView() {
	let user = localStorage.getItem("user");

	const onLoggedOut = () => {
		localStorage.clear();
		window.open("/", "_self");
	};

	const isAuth = () => {
		if (typeof window == "undefined") {
			return false;
		}
		if (localStorage.getItem("token")) {
			return localStorage.getItem("token");
		} else {
			return false;
		}
	};

	return (
		<Navbar bg="light" expand="lg" className="mb-5 navbar">
			<Container>
				<Navbar.Brand as={Link}>myFlix-Application</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbar-nav" />
				<Navbar.Collapse className="justify-content-end">
					<Nav className="me-auto">
						{isAuth() &&
							<Fragment>
								<Nav.Link as={Link} to="/">Movies</Nav.Link>
								<Nav.Link as={Link} to={`/users/${user}`}>Profile</Nav.Link>
								<Nav.Link as={Link} onClick={onLoggedOut}>Sign-out</Nav.Link>
							</Fragment>
						}
						{!isAuth() &&
							<Fragment>
								<Nav.Link as={Link} to={'/login'}>Sign-in</Nav.Link>
								<Nav.Link as={Link} to={'/register'}>Sign-up</Nav.Link>
							</Fragment>
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps, {})(NavbarView);