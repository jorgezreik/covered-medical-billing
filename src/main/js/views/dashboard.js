import React, { Component, useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import NavBar from './components/navbar.js';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container';
import Collapse from 'react-bootstrap/Collapse';
import Modal from 'react-bootstrap/Modal';
import $ from 'jquery';

import {Elements, CardElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import { FaTag, FaUser } from 'react-icons/fa';

import '../app.scss';

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
const CARD_ELEMENT_OPTIONS = {
	style: {
	  base: {
		color: "#32325d",
		fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
		fontSmoothing: "antialiased",
		fontSize: "16px",
		"::placeholder": {
		  color: "#aab7c4",
		},
	  },
	  invalid: {
		color: "#fa755a",
		iconColor: "#fa755a",
	  },
	},
  };
  <CardElement options={CARD_ELEMENT_OPTIONS} />

function AutopayButton(props) {
	const [ modalShow, setModalShow ] = React.useState(false);
	const handleClick = props.autopay
		? () => props.updateUser(false)
		: () => setModalShow(true);

	return (
		<React.Fragment>
			<Button variant="main mt-3 mt-lg-0" onClick={handleClick}>
				Autopay: {props.autopay ? 'On' : 'Off'}
			</Button>
			<AutopayModal show={modalShow} onHide={() => setModalShow(false)} updateUser={props.updateUser} />
		</React.Fragment>
	);
}

function AutopayModal(props) {
	const {updateUser, ...modalProps} = props;
	return (
		<Modal
			{...modalProps}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			dialogClassName="modal-max-width"
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter" className="primary">
					<b>Autopay</b>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>
					By clicking the button below, you will be turning on Autopay, which will charge you automatically.
				</p>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="main"
					className="mx-auto"
					onClick={() => {
						props.onHide();
						console.log('Autopay turned on!');
					}}
				>

					Turn on Autopay
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

function PaymentButton(props) {
	const onSuccess = useCallback((token, metadata) => {
		// Send the public_token and account ID to your app server.
		console.log('token: ' + token);
		console.log('account ID: ' + metadata.account_id);
		var tokObj = new Object();
		tokObj.publicToken = token;
		tokObj.accountId = metadata.account_id;
		tokObj.bankName = metadata.institution.name;
		console.log('BANK NAME', metadata.institution.name);
		$.ajax({
			url: '/api/plaidtokens/new',
			type: 'post',
			data: JSON.stringify(tokObj),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			dataType: 'json',
			success: function(response) {
				console.log(response);
			}
		});
	}, []);

	const onExit = (err, metadata) => {
		// The user exited the Link flow.
		if (err != null) {
			// The user encountered a Plaid API error prior to exiting.
			console.log('Error: ', err);
			console.log('Metadata: ', metadata);
		}
	};

	const config = {
		clientName: 'Stripe/Plaid Test',
		env: 'sandbox',
		product: [ 'auth' ],
		publicKey: '5475e6f532d5bc20abca96dba0c94a',
		onSuccess,
		onExit
		// ...
	};

	const { open, ready, error } = usePlaidLink(config);

	return (
		<React.Fragment>
			{!props.link
				?
				<Button onClick={open} disabled={!ready} variant="main" className="mt-3 mt-lg-0">
					Make one-time payment
				</Button>
				:
				<a className="mt-1"  onClick={open} disabled={!ready} href="#registerBank">
					<u>{props.link}</u>
				</a>
			}
		</React.Fragment>
	);
}

function CardButton(props) {
	const [ modalShow, setModalShow ] = React.useState(false);
	const handleClick = () => setModalShow(true);

	return (
		<React.Fragment>
				<a className="mt-1" href="#registerCreditCard" onClick={handleClick}>
					<u>Register credit card</u>
				</a>
			<CardModal show={modalShow} onHide={() => setModalShow(false)} />
		</React.Fragment>
	);
}

function CardModal(props) {
	const {...modalProps} = props;
	return (
		<Modal
			{...modalProps}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			dialogClassName="modal-max-width"
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter" className="primary">
					<b>Register Credit Card</b>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Elements stripe={stripePromise}>
					<CardElement />
				</Elements>
			</Modal.Body>
		</Modal>
	);
}

class Dashboard extends Component {
	constructor() {
		super();

		this.state = {
			user: {
				autopay: false,
				fullName: 'Loading name...',
				id: -1,
				loanOption1: 'Loading LO1...',
				loanOption2: 'Loading LO2...',
				loanOption3: 'Loading LO3...',
				password: 'Loading password...',
				phone: '0000000000',
				role: 'Loading role...',
				selectedLoan: 0,
				stripeCustomerId: '',
				userName: 'Loading email...',
				bankName: 'Loading bank name...',
				bankAccountId: ''
			},
			loan: {
				id: 0,
				amountTotal: 0,
				amountPaid: 0,
				apr: 0,
				totalMonths: 0,
				pastDatesPaid: [],
				nextPaymentAmount: 0,
				nextPaymentDate: 'Loading payment date...',
				processedDate: 'Loading processed date...',
				medicalCenter: 'Loading medical center...',
				userId: -1
			},
			accountDetailsOpen: false
		};
		this.updateUser = this.updateUser.bind(this);
	}

	componentDidMount() {
		fetch('/api/users')
			.then(response => response.json())
			.then(data => this.setState({ user: data }));

		fetch('/api/users/selectedloan')
			.then(response => response.json())
			.then(data => this.setState({ loan: data }));
	}

	updateUser(newVal) {
		let state = this.state;
		state.user.autopay = newVal;
		this.setState(state);

		const user = JSON.stringify(state.user);

		fetch("/api/users",
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(state.user),
			}
		)
		.catch((error) => {
			console.error("Error:", error);
		});
	}

	render() {
		const { user, loan, accountDetailsOpen } = this.state;

		const contactInfo = (
			<React.Fragment>
				<b>For further assistance or to change account details:</b>
				Give us a call at 732-987-6543 or email us at help@covered.com
			</React.Fragment>
		);

		const accountInfo = (
			<React.Fragment>
				<div className="my-1">
					<b>{user.fullName}</b>
				</div>
				<hr style={{ borderColor: '#C5C5C5' }} />
				<div className="mt-1">
					<b>
						<i>Email</i>
					</b>
				</div>
				{user.userName}
				<br />
				<div className="mt-1">
					<b>
						<i>Phone number</i>
					</b>
				</div>
				{user.phone.substring(0, 3)}-{user.phone.substring(3, 6)}-{user.phone.substring(6)}
				<br />
				<a className="my-1" href="#personalInfo">
					<u>Edit personal information</u>
				</a>
				<hr style={{ borderColor: '#C5C5C5' }} />
				<div className="mt-1">
					<b>
						<i>Bank</i>
					</b>
				</div>{' '}
				{user.bankName}
				<br />
				<div className="mt-1">
					<b>
						<i>Account #</i>
					</b>
				</div>{' '}
				xxx-4120<br />
				<PaymentButton link="Register bank" />
				<CardButton />
			</React.Fragment>
		);

		return (
			<React.Fragment>
				<div className="d-flex" style={{ flexFlow: 'column', height: '100%', width: '100vw' }}>
					<NavBar simple background />
					<Row style={{ width: '100%', height: '100%', flexGrow: '1' }} className="mx-auto">
						<Col
							xs={4}
							style={{ backgroundColor: '#ddd' }}
							className="d-none d-md-flex justify-content-center align-items-center"
						>
							<Row>
								<Card
									className="m-0 px-3 py-4 mb-5"
									style={{
										borderRadius: '10px',
										boxShadow: '1px 1px 3px 1px #9E9E9E'
									}}
								>
									<h5 className="primary">
										<b>Account Details</b>
									</h5>
									{accountInfo}
								</Card>
							</Row>
							<Row className="py-2 px-5" style={{ position: 'absolute', bottom: '0px' }}>
								{contactInfo}
							</Row>
						</Col>
						<Col md={8} xs={12}>
							<div className="py-4 px-0 px-sm-4">
								<Row className="p-4 d-flex d-md-none justify-content-center align-items-center">
									<Button
										onClick={() => this.setState({ accountDetailsOpen: !accountDetailsOpen })}
										aria-controls="collapse-content"
										aria-expanded={accountDetailsOpen}
										className="primary"
										variant="main"
									>
										<FaUser size={20} className="d-inline mr-2 mb-1" color="white" /> Account
										Details
									</Button>
									<Collapse in={this.state.accountDetailsOpen}>
										<div id="collapse-content">
											<Row>
												<Card
													className="mt-3 px-3 py-4 mx-auto"
													style={{
														borderRadius: '10px',
														boxShadow: '1px 1px 3px 1px #9E9E9E'
													}}
												>
													{accountInfo}
												</Card>
											</Row>
											<Row className="pt-3 px-5" style={{ position: 'relative', bottom: '0px' }}>
												{contactInfo}
											</Row>
										</div>
									</Collapse>
								</Row>
								<Row className="p-4 d-flex justify-content-between align-items-center">
									<h4 className="m-0 mt-1">
										<b>{loan.medicalCenter}</b>
									</h4>
									<div className="d-flex mt-2">

										<AutopayButton autopay = {user.autopay} updateUser={this.updateUser} />

									</div>
								</Row>
								<hr style={{ borderColor: '#C5C5C5' }} />
								<Row className="px-4 py-2 d-flex justify-content-lg-between justify-content-center align-items-center">
									<h5 className="m-0">
										<b>${loan.nextPaymentAmount}</b> due on <b>{loan.nextPaymentDate}</b>
									</h5>
									<PaymentButton />
								</Row>
								<hr style={{ borderColor: '#C5C5C5' }} />
								<Row className="p-4 align-items-center">
									<FaTag size={20} className="d-inline" />
									<h6 className="ml-3 mb-0">PURCHASE DETAILS</h6>
								</Row>
								<Row className="p-4">
									<Container>
										TOTAL OF PAYMENTS
										<br />
										<b>${loan.amountTotal}</b>
										<ProgressBar
											now={loan.amountTotal > 0 ? loan.amountPaid / loan.amountTotal * 100 : 40}
											className="mt-3"
											variant="custom"
										/>
										<Row className="d-flex m-0 py-2" style={{ justifyContent: 'space-between' }}>
											<div style={{ textAlign: 'left' }}>
												PAID<br />
												<b>${loan.amountPaid}</b>
											</div>
											<div style={{ textAlign: 'right' }}>
												REMAINING<br />
												<b>${loan.amountTotal - loan.amountPaid}</b>
											</div>
										</Row>
									</Container>
								</Row>
								<Container className="mt-4">
									LOAN TIMELINE
									<br />
									<Container className="d-flex" style={{ overflowX: 'auto' }}>
										<span className="p-4" key={0} style={{ minWidth: '150px' }}>
											Processed:<br />
											{loan.processedDate}
										</span>
										{loan.pastDatesPaid.map((date, index) => (
											<span className="p-4" style={{ minWidth: '150px' }} key={index + 1}>
												Paid:<br />
												{date}
											</span>
										))}
									</Container>
								</Container>
							</div>
						</Col>
					</Row>
				</div>
			</React.Fragment>
		);
	}
}

export default Dashboard;
