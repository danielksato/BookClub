// @flow
import { Record, List } from 'immutable';
import { SELECT_TAB, SET_GROWLER, SEARCH_BOOK_SUCCESS } from '../constants/ActionConstants';
import { createReducer } from 'redux-create-reducer';
import BookRecord from '../records/BookRecord';

export class AppStateRecord extends Record({
	error: 'Growler',
	tabIndex: 0,
	books: new List(),
}) {
	error: string;
	tabIndex: number;
	books: List<BookRecord>;
}

export default createReducer(new AppStateRecord(), {
	[SELECT_TAB]: function(state, { payload }) {
		return state.set('tabIndex', payload);
	},
	[SET_GROWLER]: function(state, { payload }) {
		return state.set('error', payload);
	},
	[SEARCH_BOOK_SUCCESS]: function(state, { payload }) {
		return state.set('books', List(payload.map((book) => new BookRecord(book))));
	},
});
