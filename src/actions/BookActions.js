// @flow
import { createAction } from 'redux-actions';
import {
	SEARCH_BOOK_SUCCESS,
	SEARCH_BOOK_FAILED,
	SUGGEST_BOOK,
	DELETE_BOOK,
	CONFIRM_BOOK,
} from '../constants/ActionConstants';
import { searchBook as searchBookApi } from '../apis/BookApi';

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
