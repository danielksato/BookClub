// @flow
import { createAction } from 'redux-actions';
import { SELECT_TAB, SET_GROWLER } from 'constants/ActionConstants';

export const selectTab = createAction(SELECT_TAB);

export const _setGrowler = createAction(SET_GROWLER);

export const setGrowler = (error: string) => {
	return (dispatch: Function) => {
		dispatch(_setGrowler(error));
		setTimeout(() => {
			dispatch(_setGrowler(''));
		}, 5000);
	};
};
