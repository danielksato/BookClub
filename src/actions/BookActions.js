// @flow
import { createAction } from 'redux-actions';
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

const _searchBookSuccess = createAction(SEARCH_BOOK_SUCCESS);

export const searchBook = (search: string) => {
	return function(dispatch: Function) {
		searchBookApi({ search }).then(
			(results) => {
				dispatch(_searchBookSuccess(results));
			},
			(err) => dispatch(setGrowler(err))
		);
	};
};

export const suggestBook = ({ book, club }: { book: BookRecord, club: ClubRecord }) => {
	return function(dispatch: Function) {
		suggestBookApi({ book, club }).then(
			(club) => {
				dispatch(loadClubSuccess(club));
				dispatch(selectTab(0));
			},
			(err) => dispatch(setGrowler(new Error(err)))
		);
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
}) => {
	return function(dispatch: Function) {
		voteApi({ book, club, inFavor }).then(
			(club) => dispatch(loadClubSuccess(club)),
			(err) => dispatch(setGrowler(new Error(err)))
		);
	};
};
