// @flow
import { createAction } from 'redux-actions';
import {
	SEARCH_BOOK_SUCCESS,
	SEARCH_BOOK_FAILED,
	DELETE_BOOK,
	CONFIRM_BOOK,
} from 'constants/ActionConstants';
import { searchBook as searchBookApi, suggestBook as suggestBookApi } from 'apis/BookApi';
import { loadClubSuccess } from 'actions/ClubActions';
import { loadUserSuccess } from 'actions/UserActions';
import { setGrowler } from 'actions/AppActions';

import type BookRecord from 'records/BookRecord';
import type { ClubRecord } from 'reducers/ClubReducer';

const _searchBookSuccess = createAction(SEARCH_BOOK_SUCCESS);
const _searchBookFailed = createAction(SEARCH_BOOK_FAILED);

export const searchBook = (search: string) => {
	return function(dispatch: Function) {
		searchBookApi({ search }).then(
			(results) => {
				dispatch(_searchBookSuccess(results));
			},
			(err) => dispatch(_searchBookFailed(err))
		);
	};
};

export const suggestBook = ({ book, club }: { book: BookRecord, club: ClubRecord }) => {
	return function(dispatch: Function) {
		suggestBookApi({ book, club }).then(
			({ club, user }) => {
				dispatch(loadClubSuccess(club));
				dispatch(loadUserSuccess(user));
			},
			(err) => {
				dispatch(setGrowler(err));
			}
		);
	};
};
