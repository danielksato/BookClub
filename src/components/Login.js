// @flow
import React, { PureComponent, type Node } from 'react';
import { connect } from 'react-redux';
import { login, createUser, loginWithGoogle } from 'actions/UserActions';

type Props = {
	login: (Object) => void,
	loginWithGoogle: () => void,
	createUser: (Object) => void,
};

const mapDispatchToProps = (dispatch: Function): Props => {
	return {
		login: (...args) => dispatch(login(...args)),
		loginWithGoogle: () => dispatch(loginWithGoogle()),
		createUser: (...args) => dispatch(createUser(...args)),
	};
};

const fieldNames = {
	LOGIN_EMAIL: 'LOGIN_EMAIL',
	CREATE_LAST_NAME: 'CREATE_LAST_NAME',
	CREATE_FIRST_NAME: 'CREATE_FIRST_NAME',
	CREATE_EMAIL: 'CREATE_EMAIL',
};

type State = {
	LOGIN_EMAIL: string,
	CREATE_LAST_NAME: string,
	CREATE_FIRST_NAME: string,
	CREATE_EMAIL: string,
};

const prettyPrint = (fieldName: string) => {
	return /[^_]+_(.*)/
		.exec(fieldName)[1]
		.toLowerCase()
		.replace(/(?:^|_)\w/g, (match) => {
			return match.replace('_', ' ').toUpperCase();
		});
};

export class Login extends PureComponent<$FlowFixMe, State> {
	state = {
		[fieldNames.CREATE_EMAIL]: '',
		[fieldNames.CREATE_FIRST_NAME]: '',
		[fieldNames.CREATE_LAST_NAME]: '',
		[fieldNames.LOGIN_EMAIL]: '',
	};

	onChange = (e: SyntheticEvent<*>): void => {
		// $FlowFixMe
		const fieldName = e.target.getAttribute('data-fieldname');
		// $FlowFixMe
		this.setState({ [fieldName]: e.target.value });
	};

	login = (): void => {
		const { LOGIN_EMAIL } = this.state;
		this.props.login({
			email: LOGIN_EMAIL,
		});
	};

	create = (): void => {
		const { CREATE_EMAIL, CREATE_FIRST_NAME, CREATE_LAST_NAME } = this.state;
		this.props.createUser({
			email: CREATE_EMAIL,
			firstName: CREATE_FIRST_NAME,
			lasName: CREATE_LAST_NAME,
		});
	};

	renderFormField = (fieldName: string): Node => {
		const prettyName = prettyPrint(fieldName);
		return (
			<div key={fieldName}>
				<label htmlFor={fieldName}>{prettyName}</label>
				<input
					className="form-control"
					data-fieldname={fieldName}
					id={fieldName}
					onChange={this.onChange}
					value={this.state[fieldName]}
				/>
			</div>
		);
	};

	renderLogin() {
		const { LOGIN_EMAIL } = fieldNames;
		return (
			<div className="form-group">
				<p>Log In</p>
				{this.renderFormField(LOGIN_EMAIL)}
				<button onClick={this.login} className="btn btn-primary">
					Log In
				</button>
			</div>
		);
	}

	renderCreateAccount() {
		const { CREATE_EMAIL, CREATE_FIRST_NAME, CREATE_LAST_NAME } = fieldNames;
		const createFields = [CREATE_EMAIL, CREATE_FIRST_NAME, CREATE_LAST_NAME].map(
			this.renderFormField
		);
		return (
			<div className="form-group">
				<p>Create an Account</p>
				{createFields}
				<button onClick={this.create} className="btn btn-primary">
					Create User
				</button>
			</div>
		);
	}

	render(): Node {
		return (
			<div className="container">
				{this.renderLogin()}
				{this.renderCreateAccount()}
				<button onClick={this.props.loginWithGoogle} className="btn btn-primary">
					Login with Google
				</button>
			</div>
		);
	}
}

export default connect(() => ({}), mapDispatchToProps)(Login);
