// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styles from '../styles/Header.module.css';
import { loadUser } from '../actions/UserActions';
import { loadClub } from '../actions/ClubActions';

import type { UserRecord } from '../reducers/UserReducer';
import type { ClubRecord } from '../reducers/ClubReducer';

const mapStateToProps = ({ user, club }) => ({ user, club });
const mapDispatchToProps = (dispatch) => ({
	loadUser: (...args) => dispatch(loadUser(...args)),
	loadClub: (...args) => dispatch(loadClub(...args)),
});

type Props = {
	user: UserRecord,
	club: ClubRecord,
	loadUser: (id: number) => void,
	loadClub: (id: number) => void,
};

export class Header extends PureComponent<Props> {
	componentDidMount() {
		this.props.loadUser(1);
		this.props.loadClub(1);
	}

	render() {
		const { user: { firstName, lastName }, club: { name } } = this.props;
		const clubName = name || 'Book Club';
		const userName = firstName ? `${firstName} ${lastName}` : 'Log jn';
		return (
			<div className={styles.container}>
				<span>{clubName}</span>
				<span>{userName}</span>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
