import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Logo from "../../resources/static/img/logo.png";
import "../app.scss";

import { FaGrinBeamSweat } from "react-icons/fa";
import { FaMusic } from "react-icons/fa";

class Error extends Component {
    render() {
        return (
            <React.Fragment>
                <Container className="mt-2 pt-3">
                    <Row className="justify-content-center">
                        <img src={Logo} height="40" alt="Newton Logo" className="mb-5" />
                    </Row>
                    <h1>404</h1>
                    <Row className="align-items-center px-2 pb-3 justify-content-center justify-content-sm-start">
                        <h1 className="display-2 display-sm-1 primary">
                            <b>Uh oh...</b>
                        </h1>
                        <FaGrinBeamSweat className="primary ml-0 ml-sm-5" size={120} />
                    </Row>
                    <h3>The page you're looking for doesn't exist!</h3>
                    <p>
                        Try checking the previous page, or click the button
                        below to go to our homepage.
                    </p>
                    <Row className="justify-content-center justify-content-md-start">
                        <Button href="/" variant="main" className="mt-sm-5 mt-2 ml-3">
                            Take me home <FaMusic className="ml-1"/>
                        </Button>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default Error;
