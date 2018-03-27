// @flow
import { createAction } from 'redux-actions';
import { LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAILED, LOG_OUT } from 'constants/ActionConstants';
import {
	getUser,
	login as loginApi,
	createUser as createUserApi,
	loginWithGoogle as loginWithGoogleApi,
	authUser as authUserApi,
	logout as logoutApi,
} from 'apis/UserApi';
import { selectTab } from 'actions/AppActions';

const _loadUser = createAction(LOAD_USER);
export const loadUserSuccess = createAction(LOAD_USER_SUCCESS);
const _loadUserFailed = createAction(LOAD_USER_FAILED);

export const _logout = createAction(LOG_OUT);
export const logout = () => {
	return (dispatch: Function): Promise<> => {
		return dispatch(logoutApi).then(() => {
			dispatch(selectTab(0));
			dispatch(_logout());
		});
	};
};

export const loadUser = (id: number) => {
	return (dispatch: Function): Promise<$FlowFixMe> => {
		dispatch(_loadUser());
		return getUser(id).then(
			(res) => dispatch(loadUserSuccess(res)),
			(err) => dispatch(_loadUserFailed(err))
		);
	};
};

export const login = (userData: $FlowFixMe) => {
	return (dispatch: Function): Promise<$FlowFixMe> => {
		return loginApi(userData).then(
			(user) => {
				dispatch(loadUserSuccess(user));
			},
			(err) => dispatch(_loadUserFailed(err))
		);
	};
};

export const createUser = (userData: $FlowFixMe) => {
	return (dispatch: Function): Promise<$FlowFixMe> => {
		return createUserApi(userData).then(
			(user) => {
				dispatch(loadUserSuccess(user));
			},
			(err) => dispatch(_loadUserFailed(err))
		);
	};
};

export const loginWithGoogle = () => {
	return (dispatch: Function): Promise<$FlowFixMe> => {
		return loginWithGoogleApi().then(
			(user) => dispatch(loadUserSuccess(user)),
			(err) => dispatch(_loadUserFailed(err))
		);
	};
};

export const authUser = () => {
	return (dispatch: Function): Promise<$FlowFixMe> => {
		return authUserApi().then((user) => dispatch(loadUserSuccess(user)));
	};
};
