// @flow
import { Record, List } from 'immutable';
import { SET_GROWLER, SEARCH_BOOK_SUCCESS, DELETE_BOOK } from 'constants/ActionConstants';
import { createReducer } from 'redux-create-reducer';
import BookRecord from 'records/BookRecord';

import type { Action } from 'actions';
import type { BookResponse } from '../apis/BookApi';

export class AppStateRecord extends Record({
	error: 'Growler',
	books: new List(),
}) {
	error: string;
	books: List<BookRecord>;
}

export default createReducer(new AppStateRecord(), {
	[SET_GROWLER]: function(state, { payload }: Action<?Error>) {
		return state.set('error', payload);
	},
	[SEARCH_BOOK_SUCCESS]: function(state, { payload }: Action<Array<BookResponse>>) {
		return state.set('books', List(payload.map((book) => new BookRecord(book))));
	},
	[DELETE_BOOK]: function(state, { payload }: Action<BookRecord>) {
		const bookId = payload.isbn;
		return state.update('books', (books: List<BookRecord>) =>
			books.filter(({ isbn }) => isbn !== bookId)
		);
	},
});
