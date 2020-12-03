'use strict';

const React = require('react'); // <1>
const ReactDOM = require('react-dom'); // <2>
const client = require('./client'); // <3>

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loginusers: [] };
	}

	componentDidMount() {
		console.log('INSIDE COMPONENTDIDMOUNT');
		client({ method: 'GET', path: '/users' }).done(response => {
			console.log('in client');
			console.log(response.entity[0]);
			this.setState({ loginusers: response.entity });
			console.log(this.state.loginusers);
		});
		console.log(this.state.loginusers);
	}
	//._embedded.loginusers

	render() {
		console.log('INSIDE RENDER');
		console.log(this.state.loginusers);
		return <LoginuserList loginusers={this.state.loginusers} />;
	}
}

class LoginuserList extends React.Component {
	render() {
		// if (this.props.loginusers) {
		console.log(this.props.loginusers);
		const loginusers = this.props.loginusers.map(loginuser => <Loginuser loginuser={loginuser} />);
		// }
		console.log('INSIDE RENDER2');
		console.log(this.props.loginusers);
		return (
			<table>
				<tbody>
					<tr>
						<th>Full Name</th>
						<th>User Name</th>
					</tr>
					{loginusers}
				</tbody>
			</table>
		);
	}
}

class Loginuser extends React.Component {
	render() {
		console.log('INSIDE RENDER3');
		return (
			<tr>
				<td>{this.props.loginuser.fullName}</td>
				<td>{this.props.loginuser.userName}</td>
			</tr>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('react'));
