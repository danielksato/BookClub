// @flow
import React, { PureComponent, type Node } from 'react';
import { connect } from 'react-redux';
import { login, createUser } from '../actions/UserActions';

type Props = {
	login: (Object) => void,
	createUser: (Object) => void,
};

const mapDispatchToProps = (dispatch: Function): Props => {
	return {
		login: (...args) => dispatch(login(...args)),
		createUser: (...args) => dispatch(createUser(...args)),
	};
};

const fieldNames = {
	LOGIN_PASSWORD: 'LOGIN_PASSWORD',
	LOGIN_EMAIL: 'LOGIN_EMAIL',
	CREATE_PASSWORD: 'CREATE_PASSWORD',
	CREATE_LAST_NAME: 'CREATE_LAST_NAME',
	CREATE_FIRST_NAME: 'CREATE_FIRST_NAME',
	CREATE_EMAIL: 'CREATE_EMAIL',
};

type State = {
	LOGIN_PASSWORD: string,
	LOGIN_EMAIL: string,
	CREATE_PASSWORD: string,
	CREATE_LAST_NAME: string,
	CREATE_FIRST_NAME: string,
	CREATE_EMAIL: string,
	canLogin: boolean,
	canCreate: boolean,
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
		[fieldNames.CREATE_PASSWORD]: '',
		[fieldNames.LOGIN_EMAIL]: '',
		[fieldNames.LOGIN_PASSWORD]: '',
		canCreate: false,
		canLogin: false,
	};

	componentDidUpdate(): void {
		const {
			CREATE_EMAIL,
			CREATE_FIRST_NAME,
			CREATE_LAST_NAME,
			CREATE_PASSWORD,
			LOGIN_EMAIL,
			LOGIN_PASSWORD,
		} = fieldNames;
		const canLogin = [LOGIN_PASSWORD, LOGIN_EMAIL].map((fieldName) => this.state[fieldName]).every((val) => val);
		const canCreate = [CREATE_EMAIL, CREATE_FIRST_NAME, CREATE_LAST_NAME, CREATE_PASSWORD]
			.map((fieldName) => this.state[fieldName])
			.every((val) => val);
		this.setState({ canLogin, canCreate });
	}

	onChange = (e: SyntheticEvent<*>): void => {
		// $FlowFixMe
		const fieldName = e.target.getAttribute('data-fieldname');
		// $FlowFixMe
		this.setState({ [fieldName]: e.target.value });
	};

	login = (): void => {
		const { LOGIN_EMAIL, LOGIN_PASSWORD } = this.state;
		this.props.login({
			email: LOGIN_EMAIL,
			password: LOGIN_PASSWORD,
		});
	};

	create = (): void => {
		const { CREATE_EMAIL, CREATE_PASSWORD, CREATE_FIRST_NAME, CREATE_LAST_NAME } = this.state;
		this.props.createUser({
			email: CREATE_EMAIL,
			password: CREATE_PASSWORD,
			firstName: CREATE_FIRST_NAME,
			lasName: CREATE_LAST_NAME,
		});
	};

	renderFormField = (fieldName: string): Node => {
		const type = fieldName.indexOf('PASSWORD') < 0 ? 'text' : 'password';
		const prettyName = prettyPrint(fieldName);
		return (
			<div key={fieldName}>
				<input
					data-fieldname={fieldName}
					id={fieldName}
					onChange={this.onChange}
					type={type}
					value={this.state[fieldName]}
				/>
				<label htmlFor={fieldName}>{prettyName}</label>
			</div>
		);
	};

	renderLogin() {
		const { canLogin } = this.state;
		const { LOGIN_EMAIL, LOGIN_PASSWORD } = fieldNames;
		const loginFields = [LOGIN_EMAIL, LOGIN_PASSWORD].map(this.renderFormField);
		return (
			<div>
				<p>Log In</p>
				{loginFields}
				<button disabled={!canLogin} onClick={this.login}>
					Log In
				</button>
			</div>
		);
	}

	renderCreateAccount() {
		const { canCreate } = this.state;
		const { CREATE_EMAIL, CREATE_FIRST_NAME, CREATE_LAST_NAME, CREATE_PASSWORD } = fieldNames;
		const createFields = [CREATE_EMAIL, CREATE_FIRST_NAME, CREATE_LAST_NAME, CREATE_PASSWORD].map(this.renderFormField);
		return (
			<div>
				<p>Create an Account</p>
				{createFields}
				<button disabled={!canCreate} onClick={this.create}>
					Create User
				</button>
			</div>
		);
	}

	render(): Node {
		return (
			<div>
				{this.renderLogin()}
				{this.renderCreateAccount()}
			</div>
		);
	}
}

export default connect(() => ({}), mapDispatchToProps)(Login);
