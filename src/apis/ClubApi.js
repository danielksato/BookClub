// @flow
import { sendJSON } from './ApiUtils';
import type { ClubRecord } from 'reducers/ClubReducer';
import type { BookResponse } from 'apis/BookApi';
import type { UserResponse } from 'apis/UserApi';

export type ClubResponse = {
	id?: number,
	name?: string,
	membership?: { role: string },
	users?: Array<UserResponse>,
	books?: Array<BookResponse>,
	votes?: Array<{ inFavor: boolean }>,
};

export const getClub = (id: number): Promise<ClubResponse> => {
	return fetch(`/api/club/${id}`, { credentials: 'include' }).then((res) => res.json());
};

export const createClub = (body: ClubRecord): Promise<ClubResponse> => {
	return sendJSON('/api/club', { body });
};

export const inviteMember = ({
	clubId,
	email,
}: {
	clubId: number,
	email: string,
}): Promise<{ club: ClubResponse }> => {
	return sendJSON(`/api/club/${clubId}/invite`, { body: { email } });
};
