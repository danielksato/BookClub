// @flow
import { sendJSON } from './ApiUtils';
import type { ClubRecord } from 'reducers/ClubReducer';
import type { BookResponse } from 'apis/BookApi';
import type { UserResponse } from 'apis/UserApi';

export type ClubResponse = {
	id?: number,
	name?: string,
	users?: Array<UserResponse>,
	books?: Array<BookResponse>,
	votes?: Array<{ inFavor: boolean }>,
};

export const getClub = (id: number): Promise<ClubResponse> => {
	return fetch(`/club/${id}`, { credentials: 'include' }).then((res) => res.json());
};

export const createClub = (body: ClubRecord): Promise<ClubResponse> => {
	return sendJSON('/club', { body });
};
