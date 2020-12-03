const ReactDOM = require('react-dom');

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './views/landing.js';
import HowItWorks from './views/howitworks.js';
import Register from './views/register.js';
import Login from './views/login.js';
import Dashboard from './views/dashboard.js';
import Error from './views/404.js';
import Rulp from './views/rulp.js';
import Application from './views/application.js';
import LoanOptions from './views/loanoptions.js';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/" component={Landing} exact />
					<Route path="/howitworks" component={HowItWorks} />
					<Route path="/register" component={Register} />
					<Route path="/loginpage" component={Login} />
                    <Route path="/dashboard" component={Dashboard} />
					<Route path="/rulp" component={Rulp} />
					<Route path="/application" component={Application} />
					<Route path="/loanoptions" component={LoanOptions} />
                    <Route component={Error} />
				</Switch>
			</BrowserRouter>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
