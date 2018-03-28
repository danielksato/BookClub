// @flow
import { sendJSON } from './ApiUtils';
import type { ClubRecord } from 'reducers/ClubReducer';

export type ClubResponse = {
	id?: number,
	name?: string,
	users?: Array<$FlowFixMe>,
	books?: Array<$FlowFixMe>,
};

export const getClub = (id: number): Promise<ClubResponse> => {
	return fetch(`/club/${id}`).then((res) => res.json());
};

export const createClub = (body: ClubRecord): Promise<ClubResponse> => {
	return sendJSON('/club', { body });
};
