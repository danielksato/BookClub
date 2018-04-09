// @flow
import React, { PureComponent, Fragment, type Node } from 'react';
import { connect } from 'react-redux';
import { loadClub, createClub } from 'actions/ClubActions';
import { acceptInvitation } from 'actions/UserActions';
import { INVITED } from 'constants/AppConstants';
import { MY_CLUBS } from 'constants/RouteConstants';

import type { List } from 'immutable';
import { ClubRecord } from 'reducers/ClubReducer';

import styles from 'styles/MyClubs.scss';

type Props = {
	currentClub: ClubRecord,
	clubs: List<ClubRecord>,
	loadClub: (id: number) => void,
	createClub: (club: ClubRecord) => void,
	acceptInvitation: (clubId: number) => void,
};

type State = { name: string };

const mapStateToProps = ({ user, club }) => ({ currentClub: club, clubs: user.clubs });
const mapDispatchToProps = (dispatch: Function) => {
	return {
		loadClub: (...args) => dispatch(loadClub(...args)),
		createClub: (...args) => dispatch(createClub(...args)),
		acceptInvitation: (...args) => dispatch(acceptInvitation(...args)),
	};
};

export class MyClubs extends PureComponent<Props, State> {
	static navString = 'My Clubs';
	static urlParam = MY_CLUBS;

	state = { name: '' };

	setName = (e: SyntheticEvent<HTMLInputElement>) => {
		this.setState({ name: e.currentTarget.value });
	};

	onSwitchClubs = (e: SyntheticEvent<HTMLElement>) => {
		const id = parseInt(e.currentTarget.getAttribute('data-clubid'), 10);
		this.props.loadClub(id);
	};

	acceptInvitation = (e: SyntheticEvent<HTMLElement>) => {
		const clubId = parseInt(e.currentTarget.getAttribute('data-clubid'), 10);
		this.props.acceptInvitation(clubId);
	};

	onCreateClub = (e: SyntheticEvent<*>) => {
		e.preventDefault;
		const { name } = this.state;
		this.props.createClub(new ClubRecord({ name }));
	};

	renderCurrentClub(): Node {
		return <div className={styles.currentClub}>Current Club: {this.props.currentClub.name}</div>;
	}

	renderAddtionalClubs(): Node {
		const { clubs, currentClub } = this.props;
		const additionalClubs = clubs
			.filter(({ id, role }) => id !== currentClub.id && role !== INVITED)
			.map(({ name, id }) => {
				return (
					<div
						key={`additional-club-${id}`}
						className={styles.clubName}
						data-clubid={id}
						onClick={this.onSwitchClubs}
					>
						{name}
					</div>
				);
			});
		if (!additionalClubs.size) {
			return null;
		}
		return (
			<div className={styles.clubList}>
				<p>Switch Club</p>
				{additionalClubs}
			</div>
		);
	}

	renderInvitedClubs(): Node {
		const { clubs } = this.props;
		const invitedClubs = clubs
			.filter(({ role }: ClubRecord) => {
				return role === INVITED;
			})
			.map(({ name, id }) => {
				return (
					<div
						key={`invited-club-${id}`}
						data-clubid={id}
						onClick={this.acceptInvitation}
						className={styles.clubName}
					>
						{name}
					</div>
				);
			});
		if (!invitedClubs.size) {
			return null;
		}
		return (
			<div className={styles.clubList}>
				<p>Pending Invitations</p>
				{invitedClubs}
			</div>
		);
	}

	renderCreateClub(): Node {
		const { name } = this.state;
		return (
			<form className={styles.createClub} onSubmit={this.onCreateClub}>
				<input id="create-club" className="form-control" value={name} onChange={this.setName} />
				<label htmlFor="create-club">Name</label>
				<button onClick={this.onCreateClub} type="submit">
					Create Club
				</button>
			</form>
		);
	}

	render(): Node {
		return (
			<div className={styles.container}>
				<h2>My Clubs</h2>
				{this.renderCurrentClub()}
				{this.renderAddtionalClubs()}
				{this.renderInvitedClubs()}
				{this.renderCreateClub()}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyClubs);
