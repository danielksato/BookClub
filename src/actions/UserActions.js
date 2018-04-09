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
import { authClub as authClubApi } from 'apis/ClubApi';
import { loadClubSuccess } from 'actions/ClubActions';
import { push } from 'react-router-redux';
import { CURRENT_CLUB, MY_CLUBS } from 'constants/RouteConstants';

import type { UserResponse } from 'apis/UserApi';

const _loadUser: ActionCreator<> = createAction(LOAD_USER);
const _loadUserSuccess: ActionCreator<UserResponse> = createAction(LOAD_USER_SUCCESS);
const _loadUserFailed: ActionCreator<> = createAction(LOAD_USER_FAILED);

export const _logout = createAction(LOG_OUT);
export const logout = (): ThunkAction => {
	return (dispatch) => {
		logoutApi().then(() => {
			dispatch(_logout());
			dispatch(push('/'));
		});
	};
};

export const loadUser = (id: number): ThunkAction => {
	return (dispatch) => {
		dispatch(_loadUser());
		getUser(id).then(
			(res) => dispatch(_loadUserSuccess(res)),
			(err) => dispatch(_loadUserFailed(err))
		);
	};
};

export const login = (userData: UserResponse): ThunkAction => {
	return (dispatch) => {
		loginApi(userData).then(
			(user) => {
				dispatch(_loadUserSuccess(user));
				authClubApi().then((club) => {
					if (club) {
						dispatch(loadClubSuccess(club));
						dispatch(push(CURRENT_CLUB));
					} else {
						dispatch(push(MY_CLUBS));
					}
				});
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
				dispatch(_loadUserSuccess(user));
				authClubApi().then((club) => {
					if (club) {
						dispatch(loadClubSuccess(club));
						dispatch(push(CURRENT_CLUB));
					} else {
						dispatch(push(MY_CLUBS));
					}
				});
			},
			(err) => dispatch(_loadUserFailed(err))
		);
	};
};

export const loginWithGoogle = (): ThunkAction => {
	return (dispatch) => {
		loginWithGoogleApi().then(
			(user) => dispatch(_loadUserSuccess(user)),
			(err) => dispatch(_loadUserFailed(err))
		);
	};
};

export const authUser = (): ThunkAction => {
	return (dispatch) => {
		return Promise.all([authUserApi(), authClubApi()]).then(
			([user, club]) => {
				dispatch(_loadUserSuccess(user));
				if (club) {
					dispatch(loadClubSuccess(club));
					// dispatch(push(CURRENT_CLUB));
				}
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
		acceptInvitationApi(clubId).then((user) => {
			dispatch(_loadUserSuccess(user));
			dispatch(push(CURRENT_CLUB));
		});
	};
};
