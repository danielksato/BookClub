// @flow
import { createAction as createReduxAction } from 'redux-actions';
import * as ActionConstants from 'constants/ActionConstants';

type ActionType = $Keys<typeof ActionConstants>;

export type Action<T: any = null> = {
	type: ActionType,
	payload: T,
};

export type ActionCreator<T: any = null> = (param?: T) => Action<T>;

export function createAction<T>(actionName: ActionType): ActionCreator<T> {
	return (payload?: T) => {
		return createReduxAction(actionName)(payload);
	};
}

export type ThunkAction = (
	dispatch: (action: Action<any> | ThunkAction) => any,
	getState?: () => Object
) => any;
