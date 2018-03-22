// @flow
import type { ClubRecord } from '../reducers/ClubReducer';

type ClubData = $FlowFixMe;

export const getClub = (id: number): Promise<ClubData> => {
	return fetch(`/club/${id}`).then((res) => res.json());
};

export const saveClub = (body: ClubRecord): Promise<ClubData> => {
	return fetch(`/club/${body.id}`, { method: 'POST', body }).then((res) => res.json());
};
