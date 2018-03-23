// @flow

export const sendJSON = (url: string, { body, method }: { body: $FlowFixMe, method?: string }): Promise<$FlowFixMe> => {
	return fetch(url, {
		credentials: 'include',
		method: method || 'POST',
		body: JSON.stringify(body),
		headers: {
			'content-type': 'application/json',
		},
	}).then((res) => res.json());
};
