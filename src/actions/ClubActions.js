// @flow
import { createAction } from 'redux-actions';
import {
	CREATE_CLUB,
	CREATE_CLUB_SUCCESS,
	CREATE_CLUB_FAILED,
	LOAD_CLUB,
	LOAD_CLUB_SUCCESS,
	LOAD_CLUB_FAILED,
} from '../constants/ActionConstants';
import { getClub, createClub as createClubApi } from '../apis/ClubApi';
import type { ClubRecord } from '../reducers/ClubReducer';

const _loadClub = createAction(LOAD_CLUB);
const _loadClubSuccess = createAction(LOAD_CLUB_SUCCESS);
const _loadClubFailed = createAction(LOAD_CLUB_FAILED);

const _createClub = createAction(CREATE_CLUB);
const _createClubSuccess = createAction(CREATE_CLUB_SUCCESS);
const _createClubFailed = createAction(CREATE_CLUB_FAILED);

export const loadClub = (id: number) => {
	return (dispatch: Function) => {
		dispatch(_loadClub());
		getClub(id).then(
			(res) => dispatch(_loadClubSuccess(res)),
			(err) => dispatch(_loadClubFailed(err))
		);
	};
};

export const createClub = (club: ClubRecord) => {
	return (dispatch: Function) => {
		dispatch(_createClub());
		createClubApi(club).then(
			(res) => {
				dispatch(_loadClubSuccess(res));
				dispatch(_createClubSuccess(res));
			},
			(err) => dispatch(_createClubFailed(err))
		);
	};
};
