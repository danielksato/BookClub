// @flow
import { sendJSON } from './ApiUtils';

import type { UserRecord } from 'reducers/UserReducer';

export type UserResponse = {
	id?: number,
	firstName?: string,
	lastName?: string,
	email?: string,
	membership?: { id: number, role: string },
	password?: string,
	clubs?: Array<number>,
};

export const getUser = (id: number): Promise<UserResponse> => {
	return fetch(`/user/${id}`).then((res) => res.json());
};

export const saveUser = (body: UserRecord): Promise<UserResponse> => {
	return fetch(`/user/${body.id}`, {
		method: 'POST',
		body,
	}).then((res) => res.json());
};

export const login = (body: UserResponse): Promise<UserResponse> => {
	return sendJSON('/login', { body });
};

export const createUser = (body: UserResponse): Promise<UserResponse> => {
	return sendJSON('/user', { body }).then((res) => {
		return sendJSON('/login', { body: { ...body, ...res } });
	});
};

export const loginWithGoogle = (): Promise<UserResponse> => {
	return fetch('/oauth2', { mode: 'no-cors', credentials: 'include' }).then((res) => res.json());
};

export const authUser = (): Promise<UserResponse> => {
	return fetch('/user', { credentials: 'include' }).then((res) => res.json());
};

export const logout = (): Promise<any> => {
	return fetch('/logout', { credentials: 'include', method: 'PUT' });
};
