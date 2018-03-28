// @flow
import { createAction, type ActionCreator, type ThunkAction } from 'actions';
import { SELECT_TAB, SET_GROWLER } from 'constants/ActionConstants';

export const selectTab: ActionCreator<number> = createAction(SELECT_TAB);

export const _setGrowler: ActionCreator<Error> = createAction(SET_GROWLER);

export const setGrowler = (error: Error): ThunkAction => {
	return (dispatch) => {
		dispatch(_setGrowler(error));
		setTimeout(() => {
			dispatch(_setGrowler());
		}, 5000);
	};
};
