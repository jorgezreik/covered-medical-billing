import React, { Component } from "react";
import Navbar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import Logo from "../../../resources/static/img/logo.png";

import "../../app.scss";

class NavBar extends Component {
    render() {
        let border = {};
        if (this.props.background) {
            border = { borderBottom: "1px solid rgba(0,0,0,0.3)" };
        }

        const links = (
            <React.Fragment>
                <Navbar.Toggle></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/howitworks">How it works</Nav.Link>
                        <Nav.Link href="#providers">Our providers</Nav.Link>
                        <Nav.Link href="#contact">Contact us</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto align-items-center">
                        {/* <Nav.Link href="#apply" className="mx-3">
                            Apply now
                        </Nav.Link> */}
                        <Button variant="main" href="/loginpage">
                            Login
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </React.Fragment>
        );

        return (
            <Navbar
                className="px-md-5 py-3 align-items-center text-center"
                variant="light"
                expand="md"
                bg={this.props.background ? "white" : "transparent"}
                style={border}
            >
                <Navbar.Brand href="/">
                    <img
                        src={Logo}
                        height="30"
                        className="d-inline-block align-top"
                        alt="Newton Logo"
                    />
                </Navbar.Brand>
                {this.props.simple ? (
                    <Button
                        className="ml-auto"
                        variant="main"
                        onClick={() => {
                            fetch(
                                "/logout"
                            ).then(() =>
                                window.location.replace(
                                    "/"
                                )
                            );
                        }}
                    >
                        Log Out
                    </Button>
                ) : (
                    links
                )}
            </Navbar>
        );
    }
}

export default NavBar;
