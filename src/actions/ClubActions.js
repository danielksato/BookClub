// @flow
import { createAction, type ActionCreator, type ThunkAction } from 'actions';
import {
	CREATE_CLUB,
	CREATE_CLUB_SUCCESS,
	CREATE_CLUB_FAILED,
	LOAD_CLUB,
	LOAD_CLUB_SUCCESS,
	LOAD_CLUB_FAILED,
	INVITE_MEMBER,
} from 'constants/ActionConstants';
import {
	getClub,
	createClub as createClubApi,
	inviteMember as inviteMemberApi,
} from 'apis/ClubApi';
import { push } from 'react-router-redux';
import { CURRENT_CLUB } from '../constants/RouteConstants';

import type { ClubRecord } from 'reducers/ClubReducer';
import type { ClubResponse } from 'apis/ClubApi';

const _loadClub: ActionCreator<> = createAction(LOAD_CLUB);
export const loadClubSuccess: ActionCreator<ClubResponse> = createAction(LOAD_CLUB_SUCCESS);
const _loadClubFailed: ActionCreator<> = createAction(LOAD_CLUB_FAILED);

const _createClub: ActionCreator<> = createAction(CREATE_CLUB);
const _createClubSuccess: ActionCreator<ClubResponse> = createAction(CREATE_CLUB_SUCCESS);
const _createClubFailed: ActionCreator<> = createAction(CREATE_CLUB_FAILED);

export const loadClub = (id: number): ThunkAction => {
	return (dispatch) => {
		dispatch(_loadClub());
		getClub(id).then(
			(res) => {
				dispatch(loadClubSuccess(res));
				dispatch(push(CURRENT_CLUB));
			},
			(err) => dispatch(_loadClubFailed(err))
		);
	};
};

export const createClub = (club: ClubRecord): ThunkAction => {
	return (dispatch) => {
		dispatch(_createClub());
		createClubApi(club).then(
			(res) => {
				dispatch(loadClubSuccess(res));
				dispatch(_createClubSuccess(res));
			},
			(err) => dispatch(_createClubFailed(err))
		);
	};
};

const _inviteMember: ActionCreator<string> = createAction(INVITE_MEMBER);
export const inviteMember = ({ clubId, email }: { clubId: number, email: string }): ThunkAction => {
	return (dispatch) => {
		dispatch(_inviteMember(email));
		inviteMemberApi({ clubId, email }).then(
			({ club, invitation: { uuid } }: { club: ClubResponse }) => {
				dispatch(loadClubSuccess(club));
				// dispatch(showLinkWithUUID(uuid))
			}
		);
	};
};
