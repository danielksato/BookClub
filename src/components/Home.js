// @flow
import React, { PureComponent, Fragment, type Node } from 'react';
import { connect } from 'react-redux';
import { ClubRecord } from 'reducers/ClubReducer';
import { UserRecord } from 'reducers/UserReducer';
import CurrentClub from './CurrentClub';

type Props = {
	user: UserRecord,
	club: ClubRecord,
};

const mapStateToProps = ({ user, club }) => ({ user, club });

export class Home extends PureComponent<Props> {
	static navString = 'Home';
	renderHeading(): Node {
		const { firstName, lastName } = this.props.user;
		return (
			<div>
				Welcome back, {firstName} {lastName}
			</div>
		);
	}

	renderCurrentClub(): Node {
		const { club, club: { id } } = this.props;
		if (id) {
			return <CurrentClub club={club} />;
		}
	}
	render(): Node {
		return (
			<Fragment>
				{this.renderHeading()}
				{this.renderCurrentClub()}
			</Fragment>
		);
	}
}

export default connect(mapStateToProps)(Home);
