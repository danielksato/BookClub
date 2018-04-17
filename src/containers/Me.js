// @flow
import React, { PureComponent, type Node } from 'react';
import { connect } from 'react-redux';
import type { UserRecord } from 'reducers/UserReducer';
import type { UserResponse } from 'apis/UserApi';
import styles from 'styles/Me.scss';
import deCamel from 'util/DeCamel';
import { modifyUser } from 'actions/UserActions';
import { openModal } from 'actions/ModalActions';
import { confirmChanges } from 'components/modals';

import type { ModifyUserParam } from 'apis/UserApi';
import type { OpenModalParams } from 'actions/ModalActions';

type State = {
	email: string,
	firstName: string,
	lastName: string,
	password: string,
};

type Props = {
	user: UserRecord,
	modifyUser: (ModifyUserParam) => void,
	openModal: (OpenModalParams) => void,
};

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = { modifyUser, openModal };

export class Me extends PureComponent<Props, State> {
	static navString = 'My Profile';
	static urlParam = '/me';

	state = {
		email: '',
		firstName: '',
		lastName: '',
		password: '',
	};

	getOnChange = (field: string) => (e: SyntheticEvent<HTMLInputElement>) => {
		this.setState({ [field]: e.currentTarget.value });
	};

	componentDidMount() {
		const { email, firstName, lastName } = this.props.user;
		this.setState({ email, firstName, lastName });
	}

	modifyUser = (e: SyntheticEvent<>): void => {
		e.preventDefault();
		const { modifyUser, user: { id }, openModal } = this.props;
		openModal(
			confirmChanges({
				onConfirm: () => modifyUser({ userId: id, values: { ...this.state } }),
			})
		);
	};

	renderFormFields(): Node {
		return (
			<form className={styles.form} onSubmit={this.modifyUser}>
				{Object.entries(this.state).map(([field, value]) => {
					return (
						<div key={`me=${field}`}>
							<input
								className="form-control"
								id={field}
								type={field === 'password' ? 'password' : 'text'}
								value={value}
								onChange={this.getOnChange(field)}
							/>
							<label htmlFor={field}>{deCamel(field)}</label>
						</div>
					);
				})}
				<button type="submit">Modify User</button>
			</form>
		);
	}

	render(): Node {
		return (
			<div className={styles.container}>
				<h2>{Me.navString}</h2>
				{this.renderFormFields()}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Me);
