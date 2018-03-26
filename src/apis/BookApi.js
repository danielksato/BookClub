// @flow
import { sendJSON } from './ApiUtils';
export const searchBook = function({ search }: { search: string }): Promise<Array<Object>> {
	return sendJSON('/book/search', { method: 'PUT', body: { search } });
};
