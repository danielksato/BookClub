// @flow
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
