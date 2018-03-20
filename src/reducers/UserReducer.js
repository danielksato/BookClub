// @flow
import { Record, List } from 'immutable';
import { createReducer } from 'redux-create-reducer';
import { LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAILED } from '../constants/ActionConstants';
import * as StatusConstants from '../constants/StatusConstants';

type ConstructorArgs = {
	id?: number,
	firstName?: string,
	lastName?: string,
	email?: string,
	clubs?: Array<number>,
};

export class UserRecord extends Record({
	id: 0,
	firstName: '',
	lastName: '',
	email: '',
	clubs: new List(),
	status: StatusConstants.INITIAL,
}) {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	clubs: List<number>;
	status: $Keys<typeof StatusConstants>;

	constructor({ id, clubs, ...rest }: ConstructorArgs = {}) {
		if (id) {
			super({
				id,
				clubs: List(clubs || []),
				status: StatusConstants.DONE,
				...rest,
			});
		} else {
			super(...arguments);
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
});
