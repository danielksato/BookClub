// @flow
import { sendJSON } from './ApiUtils';

import type { UserRecord } from 'reducers/UserReducer';
import type { ClubResponse } from 'apis/ClubApi';

export type UserResponse = {
	clubs?: Array<ClubResponse>,
	email?: string,
	firstName?: string,
	id?: number,
	lastName?: string,
	membership?: { id: number, role: string, name: string },
	password?: string,
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

export const acceptInvitation = (clubId: number): Promise<UserResponse> => {
	return sendJSON(`/club/${clubId}/accept`, { method: 'PUT', body: {} });
};
