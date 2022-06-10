import React, { Fragment } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

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
				<Navbar.Brand>myFlix-Application</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbar-nav" />
				<Navbar.Collapse className="justify-content-end">
					<Nav className="me-auto">
						{isAuth() &&
							<Fragment>
								<Nav.Link href="/">Movies</Nav.Link>
								<Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
								<Nav.Link onClick={onLoggedOut}>Sign-out</Nav.Link>
							</Fragment>
						}
						{!isAuth() &&
							<Fragment>
								<Nav.Link href={'/login'}>Sign-in</Nav.Link>
								<Nav.Link href={'/register'}>Sign-up</Nav.Link>
							</Fragment>
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}