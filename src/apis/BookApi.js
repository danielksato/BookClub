// @flow
import { sendJSON } from './ApiUtils';

import type BookRecord from 'records/BookRecord';
import type { ClubRecord } from 'reducers/ClubReducer';

export const searchBook = function({ search }: { search: string }): Promise<Array<Object>> {
	return sendJSON('/book/search', { method: 'PUT', body: { search } });
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
