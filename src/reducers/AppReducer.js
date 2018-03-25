// @flow
import { Record } from 'immutable';
import { SELECT_TAB, SET_GROWLER } from '../constants/ActionConstants';
import { createReducer } from 'redux-create-reducer';

export class AppStateRecord extends Record({
	error: 'Growler',
	tabIndex: 0,
}) {
	error: string;
	tabIndex: number;
}

export default createReducer(new AppStateRecord(), {
	[SELECT_TAB]: function(state, { payload }) {
		return state.set('tabIndex', payload);
	},
	[SET_GROWLER]: function(state, { payload }) {
		return state.set('error', payload);
	},
});
