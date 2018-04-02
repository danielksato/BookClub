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
	CREATE_EMAIL: 'CREATE_EMAIL',
	CREATE_FIRST_NAME: 'CREATE_FIRST_NAME',
	CREATE_LAST_NAME: 'CREATE_LAST_NAME',
	CREATE_PASSWORD: 'CREATE_PASSWORD',
	LOGIN_EMAIL: 'LOGIN_EMAIL',
	LOGIN_PASSWORD: 'LOGIN_PASSWORD',
};

type State = {
	CREATE_EMAIL: string,
	CREATE_FIRST_NAME: string,
	CREATE_LAST_NAME: string,
	CREATE_PASSWORD: string,
	LOGIN_EMAIL: string,
	LOGIN_PASSWORD: string,
};

const prettyPrint = (fieldName: string) => {
	return /[^_]+_(.*)/
		.exec(fieldName)[1]
		.toLowerCase()
		.replace(/(?:^|_)\w/g, (match) => {
			return match.replace('_', ' ').toUpperCase();
		});
};

export class Login extends PureComponent<Props, State> {
	state = {
		[fieldNames.CREATE_EMAIL]: '',
		[fieldNames.CREATE_FIRST_NAME]: '',
		[fieldNames.CREATE_LAST_NAME]: '',
		[fieldNames.CREATE_PASSWORD]: '',
		[fieldNames.LOGIN_EMAIL]: '',
		[fieldNames.LOGIN_PASSWORD]: '',
	};

	onChange = (e: SyntheticEvent<HTMLInputElement>): void => {
		const fieldName = e.currentTarget.getAttribute('data-fieldname');
		fieldName && this.setState({ [fieldName]: e.currentTarget.value });
	};

	login = (): void => {
		const { LOGIN_EMAIL, LOGIN_PASSWORD } = this.state;
		this.props.login({
			email: LOGIN_EMAIL,
			password: LOGIN_PASSWORD,
		});
	};

	create = (): void => {
		const { CREATE_EMAIL, CREATE_FIRST_NAME, CREATE_LAST_NAME, CREATE_PASSWORD } = this.state;
		this.props.createUser({
			email: CREATE_EMAIL,
			firstName: CREATE_FIRST_NAME,
			lastName: CREATE_LAST_NAME,
			password: CREATE_PASSWORD,
		});
	};

	renderFormField = (fieldName: string): Node => {
		const prettyName = prettyPrint(fieldName);
		const type = fieldName.includes('PASSWORD') ? 'password' : 'text';
		return (
			<div key={fieldName}>
				<label htmlFor={fieldName}>{prettyName}</label>
				<input
					className="form-control"
					data-fieldname={fieldName}
					id={fieldName}
					onChange={this.onChange}
					type={type}
					value={this.state[fieldName]}
				/>
			</div>
		);
	};

	renderLogin() {
		const { LOGIN_EMAIL, LOGIN_PASSWORD } = fieldNames;
		const loginFields = [LOGIN_EMAIL, LOGIN_PASSWORD].map(this.renderFormField);
		return (
			<div className="form-group">
				<p>Log In</p>
				{loginFields}
				<button onClick={this.login} className="btn btn-primary">
					Log In
				</button>
			</div>
		);
	}

	renderCreateAccount() {
		const { CREATE_EMAIL, CREATE_FIRST_NAME, CREATE_LAST_NAME, CREATE_PASSWORD } = fieldNames;
		const createFields = [CREATE_EMAIL, CREATE_FIRST_NAME, CREATE_LAST_NAME, CREATE_PASSWORD].map(
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
