// @flow
import { createAction } from 'redux-actions';
import { LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAILED, LOG_OUT } from '../constants/ActionConstants';
import { getUser, login as loginApi, createUser as createUserApi } from '../apis/UserApi';

const _loadUser = createAction(LOAD_USER);
const _loadUserSuccess = createAction(LOAD_USER_SUCCESS);
const _loadUserFailed = createAction(LOAD_USER_FAILED);

export const logout = createAction(LOG_OUT);

export const loadUser = (id: number) => {
	return (dispatch: Function): Promise<$FlowFixMe> => {
		dispatch(_loadUser());
		return getUser(id).then((res) => dispatch(_loadUserSuccess(res)), (err) => dispatch(_loadUserFailed(err)));
	};
};

export const login = (userData: $FlowFixMe) => {
	return (dispatch: Function): Promise<$FlowFixMe> => {
		return loginApi(userData).then(
			(user) => {
				dispatch(_loadUserSuccess(user));
			},
			(err) => dispatch(_loadUserFailed(err))
		);
	};
};

export const createUser = (userData: $FlowFixMe) => {
	return (dispatch: Function): Promise<$FlowFixMe> => {
		return createUserApi(userData).then(
			(user) => {
				dispatch(_loadUserSuccess(user));
			},
			(err) => dispatch(_loadUserFailed(err))
		);
	};
};
