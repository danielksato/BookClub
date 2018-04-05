// @flow
import { sendJSON } from './ApiUtils';

import type BookRecord from 'records/BookRecord';
import type { ClubRecord } from 'reducers/ClubReducer';
import type { ClubResponse } from 'apis/ClubApi';

// import mockBookSearch from 'mocks/BookSearch';

export type BookResponse = {
	selection: { status: string },
	votes: Array<{ inFavor: boolean, userId: number }>,
	[string]: number | string,
};

export const searchBook = function({ search }: { search: string }): Promise<Array<BookResponse>> {
	return sendJSON('/api/book/search', { method: 'PUT', body: { search } });
	// return Promise.resolve(mockBookSearch());
};

export const suggestBook = function({
	book,
	club: { id },
}: {
	book: BookRecord,
	club: ClubRecord,
}): Promise<ClubResponse> {
	return sendJSON(`/api/club/${id}/book`, { body: book });
};

export const vote = function({
	book,
	club,
	inFavor,
}: {
	book: BookRecord,
	club: ClubRecord,
	inFavor: boolean,
}): Promise<ClubResponse> {
	return sendJSON(`/api/club/${club.id}/book/${book.id}/vote`, { body: { inFavor } });
};

export const modifyBook = function({
	status,
	bookId,
	clubId,
}: {
	status: string,
	bookId: number,
	clubId: number,
}): Promise<ClubResponse> {
	return sendJSON(`/api/club/${clubId}/book/${bookId}`, { body: { status }, method: 'PUT' });
};
