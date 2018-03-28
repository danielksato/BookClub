// @flow
import { sendJSON } from './ApiUtils';

import type BookRecord from 'records/BookRecord';
import type { ClubRecord } from 'reducers/ClubReducer';

// import mockBookSearch from 'mocks/BookSearch';

export const searchBook = function({ search }: { search: string }): Promise<Array<Object>> {
	return sendJSON('/book/search', { method: 'PUT', body: { search } });
	// return Promise.resolve(mockBookSearch());
};

export const suggestBook = function({
	book,
	club: { id },
}: {
	book: BookRecord,
	club: ClubRecord,
}): Promise<$FlowFixMe> {
	return sendJSON(`/club/${id}/book`, { method: 'POST', body: book });
};

export const vote = function({
	book,
	club,
	inFavor,
}: {
	book: BookRecord,
	club: ClubRecord,
	inFavor: boolean,
}): Promise<$FlowFixMe> {
	return sendJSON(`/club/${club.id}/book/${book.id}/vote`, { method: 'POST', body: { inFavor } });
};
