// @flow
import React, { PureComponent, Fragment, type Node } from 'react';
import { connect } from 'react-redux';
import { loadClub, createClub } from '../actions/ClubActions';

import type { MembershipRecord } from '../reducers/UserReducer';
import type { List } from 'immutable';
import { ClubRecord } from '../reducers/ClubReducer';

type Props = {
	currentClub: ClubRecord,
	clubs: List<MembershipRecord>,
	loadClub: (id: number) => void,
	createClub: (club: ClubRecord) => void,
};

type State = { name: string };

const mapStateToProps = ({ user, club }) => ({ currentClub: club, clubs: user.clubs });
const mapDispatchToProps = (dispatch: Function) => {
	return {
		loadClub: (...args) => dispatch(loadClub(...args)),
		createClub: (...args) => dispatch(createClub(...args)),
	};
};

export class MyClubs extends PureComponent<Props, State> {
	static navString = 'My Clubs';

	state = { name: '' };

	setName = (e: SyntheticEvent<$FlowFixMe>) => {
		// $FlowFixMe
		this.setState({ name: e.target.value });
	};

	onSwitchClubs = (e: SyntheticEvent<$FlowFixMe>) => {
		// $FlowFixMe
		const id = parseInt(e.target.getAttribute('data-clubid'), 10);
		this.props.loadClub(id);
	};

	onCreateClub = () => {
		const { name } = this.state;
		this.props.createClub(new ClubRecord({ name }));
	};

	renderCurrentClub(): Node {
		return <div>Current Club: {this.props.currentClub.name}</div>;
	}

	renderAddtionalClubs(): Node {
		const { clubs, currentClub } = this.props;
		const additionalClubs = clubs.filter(({ id }) => id !== currentClub.id).map(({ name, id }) => {
			return (
				<div key={`additional-club-${id}`} data-clubid={id} onClick={this.onSwitchClubs}>
					{name}
				</div>
			);
		});
		if (!additionalClubs.size) {
			return null;
		}
		return (
			<div>
				<p>Switch Club:</p>
				{additionalClubs}
			</div>
		);
	}

	renderCreateClub(): Node {
		const { name } = this.state;
		return (
			<div>
				<input id="create-club" value={name} onChange={this.setName} />
				<label htmlFor="create-club">Name</label>
				<button onClick={this.onCreateClub}>Create Club</button>
			</div>
		);
	}

	render(): Node {
		return (
			<Fragment>
				{this.renderCurrentClub()}
				{this.renderAddtionalClubs()}
				{this.renderCreateClub()}
			</Fragment>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyClubs);
