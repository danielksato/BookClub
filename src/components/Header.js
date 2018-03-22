// @flow
import React, { PureComponent, type Node } from 'react';
import { connect } from 'react-redux';
import styles from '../styles/Header.module.css';
import { loadUser, logout } from '../actions/UserActions';
import { loadClub } from '../actions/ClubActions';

import type { UserRecord } from '../reducers/UserReducer';
import type { ClubRecord } from '../reducers/ClubReducer';

const mapStateToProps = ({ user, club }) => ({ user, club });
const mapDispatchToProps = (dispatch) => ({
	loadUser: (...args) => dispatch(loadUser(...args)),
	loadClub: (...args) => dispatch(loadClub(...args)),
	logout: (...args) => dispatch(logout(...args)),
});

type Props = {
	user: UserRecord,
	club: ClubRecord,
	loadUser: (id: number) => void,
	loadClub: (id: number) => void,
	logout: () => void,
};

export class Header extends PureComponent<Props> {
	componentDidMount(): void {
		// this.props.loadUser(1);
		// this.props.loadClub(1);
	}

	renderLogout(): Node {
		const { id } = this.props.user;
		return id ? <span onClick={this.props.logout}>Log Out</span> : null;
	}

	render(): Node {
		const { user: { firstName, lastName, id }, club: { name } } = this.props;
		const clubName = name || 'Book Club';
		const userName = id ? `${firstName} ${lastName}` : 'Log in';
		return (
			<div className={styles.container}>
				<span>{clubName}</span>
				<span>{userName}</span>
				{this.renderLogout()}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
