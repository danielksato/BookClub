// @flow
import mockClubData from '../mocks/Club';
import { createAction } from 'redux-actions';
import { LOAD_CLUB, LOAD_CLUB_SUCCESS, LOAD_CLUB_FAILED } from '../constants/ActionConstants';

const _loadClub = createAction(LOAD_CLUB);
const _loadClubSuccess = createAction(LOAD_CLUB_SUCCESS);
const _loadClubFailed = createAction(LOAD_CLUB_FAILED);

export const loadClub = () => {
	return (dispatch: Function) => {
		dispatch(_loadClub());
		new Promise((res) => {
			setTimeout(() => res(mockClubData()));
		}).then((res) => dispatch(_loadClubSuccess(res)), (err) => dispatch(_loadClubFailed(err)));
	};
};
