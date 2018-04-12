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
	return fetch(`/api/user/${id}`).then((res) => res.json());
};

export const saveUser = (body: UserRecord): Promise<UserResponse> => {
	return fetch(`/api/user/${body.id}`, {
		method: 'POST',
		body,
	}).then((res) => res.json());
};

export const login = (body: UserResponse): Promise<UserResponse> => {
	return sendJSON('/api/login', { body });
};

export const createUser = (body: UserResponse): Promise<UserResponse> => {
	return sendJSON('/api/user', { body });
};

export const loginWithGoogle = (): Promise<UserResponse> => {
	return (
		fetch('/api/oauth2', { mode: 'cors', credentials: 'include' })
			.then((res) => {
				return res.json();
			})
			// $FlowFixMe it doesn't really matter what the promise resolves with if we redirect
			.catch((err) => {
				window.location.href = '/api/oauth2';
			})
	);
};

export const loginWithFacebook = (): Promise<UserResponse> => {
	return (
		fetch('/api/oauth2/facebook', { mode: 'cors', credentials: 'include' })
			.then((res) => {
				return res.json();
			})
			// $FlowFixMe it doesn't really matter what the promise resolves with if we redirect
			.catch((err) => {
				window.location.href = '/api/oauth2/facebook';
			})
	);
};

export const authUser = (): Promise<UserResponse> => {
	return fetch('/api/user', { credentials: 'include' }).then((res) => res.json());
};

export const logout = (): Promise<any> => {
	return fetch('/api/logout', { credentials: 'include', method: 'PUT' });
};

export const acceptInvitation = (clubId: number): Promise<UserResponse> => {
	return sendJSON(`/api/club/${clubId}/accept`, { method: 'PUT', body: {} });
};

export type ModifyUserParam = {
	userId: number,
	values: UserResponse,
};
export const modifyUser = ({ userId, values }: ModifyUserParam): Promise<UserResponse> => {
	return sendJSON(`/api/user/${userId}`, { body: values });
};
