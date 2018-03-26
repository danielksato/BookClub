// @flow
import { sendJSON } from './ApiUtils';

import type { UserRecord } from '../reducers/UserReducer';

type UserData = $FlowFixMe;

export const getUser = (id: number): Promise<UserData> => {
	return fetch(`/user/${id}`).then((res) => res.json());
};

export const saveUser = (body: UserRecord): Promise<UserData> => {
	return fetch(`/user/${body.id}`, {
		method: 'POST',
		body,
	}).then((res) => res.json());
};

export const login = (body: $FlowFixMe): Promise<UserData> => {
	return fetch('/login', {
		method: 'PUT',
		body,
	}).then((res) => res.json());
};

export const createUser = (body: $FlowFixMe): Promise<UserData> => {
	return sendJSON('/user', { body });
};

export const loginWithGoogle = (): Promise<UserData> => {
	return fetch('/oauth2', { mode: 'no-cors', credentials: 'include' }).then(
		(res) => res.ok && res.json()
	);
};

export const authUser = (): Promise<UserData> => {
	return fetch('/user', { credentials: 'include' }).then((res) => res.ok && res.json());
};

export const logout = (): Promise<Response> => {
	return fetch('/logout', { credentials: 'include', method: 'PUT' });
};
