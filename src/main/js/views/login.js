import React, { Component, useState } from 'react';

import NavBar from './components/navbar.js';
import Footer from './components/footer.js';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import '../app.scss';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	username: Yup.string().email('Must be a valid email').required('Required'),
	password: Yup.string().required('Required')
});

function LoginForm() {
	const [ loginFailed, setLoginFailed ] = useState(null);

	const {
		handleSubmit,
		handleChange,
		values,
		errors,
		touched,
		handleBlur,
		dirty,
		isValid,
		isSubmitting,
		setSubmitting
	} = useFormik({
		initialValues: {
			username: '',
			password: ''
		},
		validationSchema,
		onSubmit(values) {
			let formData = new FormData();
			formData.append('username', values.username);
			formData.append('password', values.password);
			const data = new URLSearchParams(formData);
			// const data = JSON.stringify({
			// 	fullName: 'Niko Fotopoulos',
			// 	userName: values.username,
			// 	password: values.password,
			// 	role: 'USER',
			// 	loanOption1: '',
			// 	loanOption2: '',
			// 	loanOption3: '',
			// 	stripeCustomerId: '',
			// 	autopay: false,
			// 	selectedLoan: 0
			// });
			// const loginData = JSON.stringify(values);
			// console.log('LOG IN VALUES');
			// console.log(formData);
			// console.log(data);
			// debugger;

			fetch('/login-process', {
				method: 'POST',
				body: data
			})
				.then(response => {
					console.log('Success');
					console.log(response);
					console.log(response.url);
					// console.log(response.headers.get('Authorization'));
					if (response.url.indexOf('/dashboard') > -1) {
						window.location.replace(response.url);
					} else if (response.url.indexOf('/badcredentials') > -1) {
						// console.log(response);
						setLoginFailed(
							<div className="invalid-feedback d-block position-static pt-2">
								Your email or password is incorrect.
							</div>
						);
					} else {
						// console.log(response);
						setLoginFailed(
							<div className="invalid-feedback d-block position-static pt-2">
								Your email or password is incorrect.
							</div>
						);
					}
				})
				.then(() => {
					setSubmitting(false);
				})
				.catch(error => {
					console.error('Error:', error);
				});
		}
	});

	return (
		<Form noValidate onSubmit={handleSubmit} className="text-left floating-form mb-5">
			<h2 className="text-center mb-4">
				<b>Login</b>
			</h2>
			<Form.Group className="pb-2">
				<Form.Label>Email</Form.Label>
				<Form.Control
					type="email"
					name="username"
					value={values.username}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Email"
					isValid={touched.username && !errors.username}
					isInvalid={touched.username && !!errors.username}
				/>
				<Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
			</Form.Group>
			<Form.Group className="pb-0 mb-0">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					name="password"
					value={values.password}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Password"
					isValid={touched.password && !errors.password}
					isInvalid={touched.password && !!errors.password}
				/>
				<Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
			</Form.Group>
			<Row className="justify-content-center text-center">
				<Button type="submit" variant="main" disabled={!(isValid && dirty) || isSubmitting} className="mt-5">
					{isSubmitting ? 'Loading...' : 'Submit'}
				</Button>
				{loginFailed}
			</Row>
		</Form>
	);
}

class Login extends Component {
	componentDidMount() {
		fetch('/api/users/signinstatus')
			.then(response => response.json())
			.then(data => {
				console.log('Success: ', data);
				if (data == true) window.location.replace('/dashboard');
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}

	render() {
		return (
			<React.Fragment>
				<div>
					<NavBar />
					<Col lg={4} md={5} sm={7} className="mx-auto mt-4">
						<LoginForm />
					</Col>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}

export default Login;
