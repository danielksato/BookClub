// @flow
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { ClubRecord } from '../reducers/ClubReducer';
import { UserRecord } from '../reducers/UserReducer';
import CurrentClub from './CurrentClub';

type Props = {
	user: UserRecord,
	club: ClubRecord,
};

const mapStateToProps = ({ user, club }) => ({ user, club });

export class Home extends PureComponent<Props> {
	static navString = 'Home';
	renderHeading() {
		const { firstName, lastName } = this.props.user;
		return (
			<div>
				Welcome back, {firstName} {lastName}
			</div>
		);
	}
	render() {
		return (
			<Fragment>
				{this.renderHeading()}
				<CurrentClub club={this.props.club} />
			</Fragment>
		);
	}
}

export default connect(mapStateToProps)(Home);
