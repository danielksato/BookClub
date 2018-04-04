// @flow
import { Record } from 'immutable';

export default class MessageRecord extends Record({
	clubId: 0,
	id: 0,
	message: '',
	updatedAt: '',
	userId: 0,
}) {
	clubId: number;
	id: number;
	updatedAt: string;
	userId: number;
	message: string;
}
