// @flow
import { Record, List, fromJS } from 'immutable';
import { createReducer } from 'redux-create-reducer';
import { UserRecord } from './UserReducer';
import * as StatusConstants from 'constants/StatusConstants';
import { LOAD_CLUB, LOAD_CLUB_SUCCESS, LOAD_CLUB_FAILED, LOG_OUT } from 'constants/ActionConstants';
import BookRecord from 'records/BookRecord';

import type { ClubResponse } from 'apis/ClubApi';
import type { Action } from 'actions';

export class ClubRecord extends Record({
	id: 0,
	name: '',
	users: new List(),
	books: new List(),
	status: StatusConstants.INITIAL,
}) {
	id: number;
	name: string;
	users: List<UserRecord>;
	books: List<BookRecord>;
	status: $Keys<typeof StatusConstants>;

	constructor({ users, books, ...rest }: ClubResponse = {}) {
		if (rest.name) {
			super({
				users: List(users ? users.map((user) => new UserRecord(user)) : []),
				books: fromJS(books ? books.map((book) => new BookRecord(book)) : []),
				status: StatusConstants.DONE,
				...rest,
			});
		} else {
			super();
		}
	}
}

export default createReducer(new ClubRecord(), {
	[LOAD_CLUB]: function(state) {
		return state.set('status', StatusConstants.IN_PROGRESS);
	},
	[LOAD_CLUB_SUCCESS]: function(state, { payload }: Action<ClubResponse>) {
		return new ClubRecord(payload);
	},
	[LOAD_CLUB_FAILED]: function(state) {
		return state.set('status', StatusConstants.ERROR);
	},
	[LOG_OUT]: function(state) {
		return new ClubRecord();
	},
});
