// @flow
import { createAction } from 'redux-actions';
import { LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAILED } from '../constants/ActionConstants';
import { getUser } from '../apis/UserApi';

const _loadUser = createAction(LOAD_USER);
const _loadUserSuccess = createAction(LOAD_USER_SUCCESS);
const _loadUserFailed = createAction(LOAD_USER_FAILED);

export const loadUser = (id: number) => {
	return (dispatch: Function): Promise<$FlowFixMe> => {
		dispatch(_loadUser());
		return getUser(id).then((res) => dispatch(_loadUserSuccess(res)), (err) => dispatch(_loadUserFailed(err)));
	};
};
