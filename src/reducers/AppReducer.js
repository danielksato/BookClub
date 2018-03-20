// @flow
import { Record } from 'immutable';
import { SELECT_TAB } from '../constants/ActionConstants';
import { createReducer } from 'redux-create-reducer';

export class AppStateRecord extends Record({
	tabIndex: null,
}) {
	tabIndex: ?number;
}

export default createReducer(new AppStateRecord(), {
	[SELECT_TAB]: function(state, { payload }) {
		console.log(payload);
		return state.set('tabIndex', payload);
	},
});
