// @flow
import React, { PureComponent, type Node } from 'react';
import { connect } from 'react-redux';
import styles from 'styles/Header.module.css';
import { logout, authUser } from 'actions/UserActions';
import { loadClub } from 'actions/ClubActions';

import type { UserRecord } from 'reducers/UserReducer';
import type { ClubRecord } from 'reducers/ClubReducer';

const mapStateToProps = ({ user, club }) => ({ user, club });
const mapDispatchToProps = (dispatch) => ({
	loadClub: (...args) => dispatch(loadClub(...args)),
	logout: (...args) => dispatch(logout(...args)),
	authUser: () => dispatch(authUser()),
});

type Props = {
	user: UserRecord,
	club: ClubRecord,
	loadClub: (id: number) => void,
	logout: () => void,
	authUser: () => void,
};

export class Header extends PureComponent<Props> {
	componentDidMount() {
		this.props.authUser();
	}

	componentDidUpdate(oldProps: Props): void {
		const { user: { clubs }, club: { id } } = this.props;
		const firstClubId = clubs.getIn([0, 'id']);
		if (firstClubId && !id) {
			this.props.loadClub(firstClubId);
		}
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
