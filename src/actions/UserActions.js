// @flow
import { createAction, type ThunkAction, type ActionCreator } from 'actions';
import { LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAILED, LOG_OUT } from 'constants/ActionConstants';
import {
	getUser,
	login as loginApi,
	createUser as createUserApi,
	loginWithGoogle as loginWithGoogleApi,
	authUser as authUserApi,
	logout as logoutApi,
	acceptInvitation as acceptInvitationApi,
} from 'apis/UserApi';
import { selectTab } from 'actions/AppActions';
import type { UserResponse } from 'apis/UserApi';
import { loadClub } from 'actions/ClubActions';

const _loadUser: ActionCreator<> = createAction(LOAD_USER);
const _loadUserSuccess: ActionCreator<UserResponse> = createAction(LOAD_USER_SUCCESS);
const _loadUserFailed: ActionCreator<> = createAction(LOAD_USER_FAILED);

export const loadUserSuccess = (user: UserResponse): ThunkAction => {
	return (dispatch) => {
		if (user.clubs && user.clubs[0] && user.clubs[0].id) {
			dispatch(loadClub(user.clubs[0].id));
		}
		dispatch(_loadUserSuccess(user));
	};
};

export const _logout = createAction(LOG_OUT);
export const logout = (): ThunkAction => {
	return (dispatch) => {
		logoutApi().then(() => {
			dispatch(selectTab(0));
			dispatch(_logout());
		});
	};
};

export const loadUser = (id: number): ThunkAction => {
	return (dispatch) => {
		dispatch(_loadUser());
		getUser(id).then(
			(res) => dispatch(loadUserSuccess(res)),
			(err) => dispatch(_loadUserFailed(err))
		);
	};
};

export const login = (userData: UserResponse): ThunkAction => {
	return (dispatch) => {
		loginApi(userData).then(
			(user) => {
				dispatch(loadUserSuccess(user));
			},
			(err) => {
				dispatch(_loadUserFailed(err));
			}
		);
	};
};

export const createUser = (userData: UserResponse): ThunkAction => {
	return (dispatch) => {
		createUserApi(userData).then(
			(user) => {
				dispatch(loadUserSuccess(user));
			},
			(err) => dispatch(_loadUserFailed(err))
		);
	};
};

export const loginWithGoogle = (): ThunkAction => {
	return (dispatch) => {
		loginWithGoogleApi().then(
			(user) => dispatch(loadUserSuccess(user)),
			(err) => dispatch(_loadUserFailed(err))
		);
	};
};

export const authUser = (): ThunkAction => {
	return (dispatch) => {
		return authUserApi().then(
			(user) => {
				dispatch(loadUserSuccess(user));
				return user;
			},
			(err) => {
				/* eslint-disable no-console */
				console.error(err);
				/* eslint-enable no-console */
			}
		);
	};
};

export const acceptInvitation = (clubId: number): ThunkAction => {
	return (dispatch) => {
		acceptInvitationApi(clubId).then((user) => dispatch(loadUserSuccess(user)));
	};
};
