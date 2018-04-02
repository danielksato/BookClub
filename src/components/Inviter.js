// @flow
import React, { PureComponent, type Node } from 'react';
import { ClubRecord } from 'reducers/ClubReducer';

type Props = {
	inviteMember: ({ clubId: number, email: string }) => void,
	club: ClubRecord,
};

type State = {
	value: string,
};

export default class Inviter extends PureComponent<Props, State> {
	state = {
		value: '',
	};

	onChange = ({ currentTarget: { value } }: SyntheticEvent<HTMLInputElement>): void => {
		this.setState({ value });
	};

	onSubmit = (): void => {
		this.props.inviteMember({
			email: this.state.value,
			clubId: this.props.club.id,
		});
	};

	render(): Node {
		const { value } = this.state;
		return (
			<div>
				<input id="invite-members" value={this.state.value} onChange={this.onChange} />
				<label htmlFor="invite-members">Invite a new group member by email</label>
				<button className="btn btn-primary" disabled={!value.includes('@')} onClick={this.onSubmit}>
					Invite
				</button>
			</div>
		);
	}
}
