// @flow
import React, { PureComponent, type Node } from 'react';
import { connect } from 'react-redux';
import { authUser } from 'actions/UserActions';
import { loadClub } from 'actions/ClubActions';
import Navigation from 'components/Navigation';

import type { UserRecord } from 'reducers/UserReducer';
import type { ClubRecord } from 'reducers/ClubReducer';

const mapStateToProps = ({ user, club }) => ({ user, club });
const mapDispatchToProps = (dispatch) => ({
	loadClub: (...args) => dispatch(loadClub(...args)),
	authUser: () => dispatch(authUser()),
});

type Props = {
	user: UserRecord,
	club: ClubRecord,
	loadClub: (id: number) => void,
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

	renderNav(): Node {
		const { id } = this.props.user;

		if (!id) {
			return null;
		}

		return (
			<div className="navbar-collapse">
				<Navigation />;
			</div>
		);
	}

	renderUser(): Node {
		const { user: { firstName, lastName, id } } = this.props;
		const userName = id ? `${firstName} ${lastName}` : null;

		return <span className="navbar-text">{userName || 'Log In'}</span>;
	}

	render(): Node {
		const { club: { name } } = this.props;
		const clubName = name || 'Book Club';

		return (
			<div className="navbar navbar-dark navbar-expand-lg bg-dark d-flex justify-content-between">
				<span className="navbar-brand">{clubName}</span>
				{this.renderNav()}
				{this.renderUser()}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
