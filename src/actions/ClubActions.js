// @flow
import { createAction } from 'redux-actions';
import { LOAD_CLUB, LOAD_CLUB_SUCCESS, LOAD_CLUB_FAILED } from '../constants/ActionConstants';
import { getClub } from '../apis/ClubApi';

const _loadClub = createAction(LOAD_CLUB);
const _loadClubSuccess = createAction(LOAD_CLUB_SUCCESS);
const _loadClubFailed = createAction(LOAD_CLUB_FAILED);

export const loadClub = (id: number) => {
	return (dispatch: Function) => {
		dispatch(_loadClub());
		getClub(id).then((res) => dispatch(_loadClubSuccess(res)), (err) => dispatch(_loadClubFailed(err)));
	};
};
