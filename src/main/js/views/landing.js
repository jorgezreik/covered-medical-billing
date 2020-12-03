import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Icon from '../../resources/static/img/icon.png';
import Doctor from '../../resources/static/img/doctor.png';
import Transparent from '../../resources/static/img/transparent.svg';
import Flexible from '../../resources/static/img/flexible.svg';
import Simple from '../../resources/static/img/simple.svg';
import People from '../../resources/static/img/people.png';

import NavBar from './components/navbar.js';
import Footer from './components/footer.js';

import '../app.scss';

function Header() {
	console.log('IN HEADING');
	return (
		<header className="masthead position-relative overflow-hidden text-center">
			<NavBar />
			<Col md={5} className="h-100 p-lg-5 mx-auto py-5 my-5">
				<h1 className="display-4">
					<b>Financing that cares</b>
				</h1>
				<p className="lead">
					Welcome to a new way of financing medical bills. We partner with your provider so you can make your
					payment over time.
				</p>
				<Button variant="main" href="/loginpage">
					APPLY NOW
				</Button>
				<Row>
					<a className="my-4 mx-auto line-link" href="/howitworks">
						HOW IT WORKS
					</a>
				</Row>
			</Col>
			<img src={Icon} className="mast-left d-none d-sm-block" alt="Newton Icon" />
			<img src={Doctor} className="mast-right d-none d-none d-sm-block" alt="Doctor with patient" />
		</header>
	);
}

function Qualities() {
	return (
		<Container className="text-center my-5 py-1">
			<Row className="mb-5">
				<h3 className="mx-auto">
					<b>We partner with your provider to make healthcare affordable.</b>
				</h3>
			</Row>
			<Row xs={1} sm={3} className="mb-1">
				<Quality image={Transparent} alt="Checklist" title="Transparent" text="No fees or APR hikes, ever." />
				<Quality image={Flexible} alt="Touch" title="Flexible" text="Multiple options to finance your bills." />
				<Quality
					image={Simple}
					alt="Arrows"
					title="Simple"
					text="Monthly payments through our one-click payment portal."
				/>
			</Row>
			<Row>
				<Button variant="main" href="/howitworks" className="mx-auto">
					LEARN MORE
				</Button>
			</Row>
		</Container>
	);
}

function Mission() {
	return (
		<Container className="text-center my-5 py-5">
			<Row>
				<h3 className="mx-auto">
					<b>Relieving medical debt starts with us.</b>
				</h3>
			</Row>
			<Row xs={1} sm={2} className="justify-content-md-center">
				<Col lg="4">
					<Row>
						<h5 className="mx-auto mb-3 mt-5">
							For every $1 spent using our service, we will relieve $1 of medical debt to reverse this
							vicious cycle.
						</h5>
					</Row>
					<Row>
						<p className="mx-auto mb-4">Learn more about our mission.</p>
					</Row>
					<Row>
						<Button variant="main" href="#about" className="mx-auto">
							ABOUT US
						</Button>
					</Row>
				</Col>
				<Col xs lg="4" className="mt-2">
					<img src={People} height="275" className="d-inline-block align-top" alt="People Illustration" />
				</Col>
			</Row>
		</Container>
	);
}

function Quality(props) {
	return (
		<Col className="text-align-center mb-4">
			<img src={props.image} className="mb-2" height="150px" alt={props.alt} />
			<div>
				<h5>
					<b className="m-2 primary">{props.title}</b>
				</h5>
			</div>
			<p>{props.text}</p>
		</Col>
	);
}
class Landing extends Component {
	render() {
		return (
			<React.Fragment>
				<div>
					<Header />
					<Container className="px-2">
						<Qualities />
						<Mission />
					</Container>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}

export default Landing;
