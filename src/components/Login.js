// @flow
import React, { Component } from 'react';

export default class Login extends Component<$FlowFixMe> {
	login = () => {
		fetch('http://localhost:8080/auth/facebook', { mode: 'no-cors' });
	};

	logout = () => {
		fetch('http://localhost:8080/logout', { mode: 'no-cors' });
	};

	render() {
		return (
			<div>
				<a onClick={this.login}>Log in with Facebook</a>;
				<a onClick={this.logout}>Log out</a>
			</div>
		);
	}
}
