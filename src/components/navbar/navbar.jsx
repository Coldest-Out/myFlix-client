import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
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
		<>
			<Navbar collapseOnSelect expand="lg" bg="alert" variant="light">
				<Container>
					<Navbar.Brand href="#home">MyFlix-App</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						{isAuth() && (
							<><Nav className="mx-auto">
								<Nav.Link href="/">Movies</Nav.Link>
								<Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
							</Nav>
								<Nav key={user._id} className="mx-auto">
									<Nav.Link onClick={onLoggedOut}>Sign-Out</Nav.Link>
									<Nav.Link disabled>{user}</Nav.Link>
								</Nav></>
						)}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	)
}
