// @flow
import { Record, List } from 'immutable';
import { createReducer } from 'redux-create-reducer';
import { UserRecord } from './UserReducer';
import * as StatusConstants from '../constants/StatusConstants';
import { LOAD_CLUB, LOAD_CLUB_SUCCESS, LOAD_CLUB_FAILED } from '../constants/ActionConstants';

type ConstructorArgs = {
	id?: number,
	name?: string,
	adminIds?: Array<number>,
	memberIds?: Array<number>,
	members?: Array<any>,
};

export class ClubRecord extends Record({
	id: 0,
	name: '',
	adminIds: new List(),
	memberIds: new List(),
	members: new List(),
	status: StatusConstants.INITIAL,
}) {
	id: number;
	name: string;
	adminIds: List<number>;
	memberIds: List<number>;
	members: List<UserRecord>;
	status: $Keys<typeof StatusConstants>;

	constructor({ adminIds, memberIds, members, ...rest }: ConstructorArgs = {}) {
		if (rest.id) {
			super({
				adminIds: List(adminIds || []),
				memberIds: List(memberIds || []),
				members: List(members ? members.map((member) => new UserRecord(member)) : []),
				status: StatusConstants.DONE,
				...rest,
			});
		} else {
			super(...arguments);
		}
	}
}

export default createReducer(new ClubRecord(), {
	[LOAD_CLUB]: function(state) {
		return state.set('status', StatusConstants.IN_PROGRESS);
	},
	[LOAD_CLUB_SUCCESS]: function(state, { payload }) {
		return new ClubRecord(payload);
	},
	[LOAD_CLUB_FAILED]: function(state) {
		return state.set('status', StatusConstants.ERROR);
	},
});
