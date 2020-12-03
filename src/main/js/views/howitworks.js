import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";

import HealthDesk from "../../resources/static/img/healthdesk.png";
import Cloud from "../../resources/static/img/cloud.png";
import ExampleLoan from "../../resources/static/img/exampleloan.png";

import NavBar from "./components/navbar.js";
import Footer from "./components/footer.js";

import "../app.scss";

function Step(props) {
    let button;

    if (props.button) {
        button = (
            <Button variant="main" href="#providers">
                {props.button}
            </Button>
        );
    }

    const text = (
        <Col className="my-auto mx-auto" style={{ maxWidth: "90vw" }}>
            <Row>
                <h5>
                    <b>STEP {props.step}</b>
                </h5>
            </Row>
            <Row>
                <h2>
                    <b>{props.title}</b>
                </h2>
            </Row>
            <Row>
                <p>{props.body}</p>
            </Row>
            <Row className="justify-content-center">{button}</Row>
        </Col>
    );

    const image = (
        <Col className="text-align-center d-none d-md-block">
            <img
                className="mx-auto d-block"
                style={{ maxWidth: "90vw" }}
                src={props.image}
                height={props.height}
                alt={props.alt}
            ></img>
        </Col>
    );

    if (props.align === "right") {
        return (
            <Row className="py-5">
                {image}
                {text}
            </Row>
        );
    } else {
        return (
            <Row className="py-5">
                {text}
                {image}
            </Row>
        );
    }
}

function OptionCard(props) {
    return (
        <Card className="card-option my-3">
            <Card.Body>
                <Card.Title>{props.text}</Card.Title>
                <Card.Subtitle>{props.subtext}</Card.Subtitle>
                <Card.Text>{props.price}</Card.Text>
            </Card.Body>
        </Card>
    );
}

class HowItWorks extends Component {
    render() {
        return (
            <React.Fragment>
                <div>
                    <NavBar />
                    <Container className="px-2">
                        <h1 className="text-center display-3 mx-md-5 px-md-5 py-2">
                            <b>Here's how to finance with isaac.</b>
                        </h1>
                        <Step
                            step={1}
                            title="Health first, pay later."
                            body="After your physician's office bills you the out-of-pocket cost, 
                                    they will send you our secure loan application so you can get a
                                    decision within 2 business days."
                            button="OUR PROVIDERS"
                            image={HealthDesk}
                            alt="Health center front desk."
                            align="left"
                            height="300px"
                        />
                        <Image
                            src={Cloud}
                            className="left-list d-none d-md-block"
                        />
                        <ul className="option-list d-none d-md-block">
                            <OptionCard
                                text="75.83/mo for 6 months"
                                subtext="Interest (APR) 0%"
                                price="$0"
                            />
                            <OptionCard
                                text="51.51/mo for 9 months"
                                subtext="Interest (APR) 4.5%"
                                price="$8.57"
                            />
                            <OptionCard
                                text="39.58/mo for 12 months"
                                subtext="Interest (APR) 8%"
                                price="$19.96"
                            />
                        </ul>
                        <Step
                            step={2}
                            title="Choose how you pay."
                            body="Select the payment schedule you like best, then confirm your loan.
                                     We’ll never charge more than you see up front."
                            align="right"
                            height="600px"
                        />
                        <Step
                            step={3}
                            title="Make easy monthly payments."
                            body="Just sign in at isaac.com. We'll send you email and text
                                    reminders whenever a payment's coming up, or setup scheduled payments.
                                    That's it!"
                            align="left"
                            image={ExampleLoan}
                            height="400px"
                        />
                    </Container>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default HowItWorks;
