// @flow
import { createAction, type ActionCreator, type ThunkAction } from 'actions';
import {
	SEARCH_BOOK_SUCCESS,
	// DELETE_BOOK,
	// CONFIRM_BOOK,
} from 'constants/ActionConstants';
import {
	searchBook as searchBookApi,
	suggestBook as suggestBookApi,
	vote as voteApi,
} from 'apis/BookApi';
import { loadClubSuccess } from 'actions/ClubActions';
import { setGrowler, selectTab } from 'actions/AppActions';

import type BookRecord from 'records/BookRecord';
import type { ClubRecord } from 'reducers/ClubReducer';
import type { ClubResponse } from 'apis/ClubApi';
import type { BookResponse } from 'apis/BookApi';

type SearchBookSuccessParam = Array<BookResponse>;
const _searchBookSuccess: ActionCreator<SearchBookSuccessParam> = createAction(SEARCH_BOOK_SUCCESS);

const handleBookError = (dispatch) => (err) => {
	/* eslint-disable no-console */
	console.error(err);
	/* eslint-enable no-console */
	dispatch(setGrowler(new Error('Book error')));
};

export const searchBook = (search: string): ThunkAction => {
	return (dispatch) => {
		searchBookApi({ search }).then((results: SearchBookSuccessParam) => {
			dispatch(_searchBookSuccess(results));
		}, handleBookError(dispatch));
	};
};

export const suggestBook = ({
	book,
	club,
}: {
	book: BookRecord,
	club: ClubRecord,
}): ThunkAction => {
	return function(dispatch) {
		suggestBookApi({ book, club }).then((club: ClubResponse) => {
			dispatch(loadClubSuccess(club));
			dispatch(selectTab(0));
		}, handleBookError(dispatch));
	};
};

export const vote = ({
	book,
	club,
	inFavor,
}: {
	book: BookRecord,
	club: ClubRecord,
	inFavor: boolean,
}): ThunkAction => {
	return function(dispatch) {
		voteApi({ book, club, inFavor }).then(
			(club) => dispatch(loadClubSuccess(club)),
			handleBookError(dispatch)
		);
	};
};
