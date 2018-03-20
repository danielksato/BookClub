// @flow
import mockUserData from '../mocks/User';
import { createAction } from 'redux-actions';
import { LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAILED } from '../constants/ActionConstants';

const _loadUser = createAction(LOAD_USER);
const _loadUserSuccess = createAction(LOAD_USER_SUCCESS);
const _loadUserFailed = createAction(LOAD_USER_FAILED);

export const loadUser = () => {
	return (dispatch: Function) => {
		dispatch(_loadUser());
		new Promise((res) => {
			setTimeout(() => res(mockUserData()));
		}).then((res) => dispatch(_loadUserSuccess(res)), (err) => dispatch(_loadUserFailed(err)));
	};
};
