// @flow
import { Record, List } from 'immutable';
import { createReducer } from 'redux-create-reducer';
import {
	LOAD_USER,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAILED,
	LOG_OUT,
	CREATE_CLUB_SUCCESS,
} from '../constants/ActionConstants';
import * as StatusConstants from '../constants/StatusConstants';
import { INVITED } from '../constants/AppConstants';

export class MembershipRecord extends Record({
	id: 0,
	role: 'invited',
	name: '',
}) {
	id: number;
	role: string;
	name: string;
}

type ConstructorArgs = {
	id?: number,
	firstName?: string,
	lastName?: string,
	email?: string,
	membership?: { id: number, role: string },
	clubs?: Array<number>,
};

export class UserRecord extends Record({
	id: 0,
	firstName: '',
	lastName: '',
	email: '',
	clubs: new List(),
	role: INVITED,
	status: StatusConstants.INITIAL,
}) {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	clubs: List<number>;
	role: string;
	status: $Keys<typeof StatusConstants>;

	constructor({ id, clubs, membership, ...rest }: ConstructorArgs = {}) {
		if (id) {
			super({
				id,
				clubs: List(clubs ? clubs.map((club) => new MembershipRecord(club)) : []),
				role: membership ? membership.role : INVITED,
				status: StatusConstants.DONE,
				...rest,
			});
		} else {
			super();
		}
	}
}

export default createReducer((new UserRecord(): UserRecord), {
	[LOAD_USER]: function(state) {
		return state.set('status', StatusConstants.IN_PROGRESS);
	},
	[LOAD_USER_SUCCESS]: function(state, action) {
		return new UserRecord(action.payload);
	},
	[LOAD_USER_FAILED]: function(state) {
		return state.set('status', StatusConstants.ERROR);
	},
	[LOG_OUT]: function(state) {
		return new UserRecord();
	},
	[CREATE_CLUB_SUCCESS]: function(state, action) {
		return state.update('clubs', (clubs) => clubs.push(new MembershipRecord(action.payload)));
	},
});
