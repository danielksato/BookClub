// @flow
import { sendJSON } from './ApiUtils';
import type { ClubRecord } from 'reducers/ClubReducer';

type ClubData = $FlowFixMe;

export const getClub = (id: number): Promise<ClubData> => {
	return fetch(`/club/${id}`).then((res) => res.json());
};

export const createClub = (body: ClubRecord): Promise<ClubData> => {
	return sendJSON('/club', { body });
};
