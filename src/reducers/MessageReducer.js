// @flow
import { List, Record } from 'immutable';
import { createReducer } from 'redux-create-reducer';
import * as StatusConstants from 'constants/StatusConstants';
import {
	GET_MESSAGES_FAILED,
	GET_MESSAGES_SUCCESS,
	GET_MESSAGES,
	SEND_MESSAGE_FAILED,
	SEND_MESSAGE_SUCCESS,
	SEND_MESSAGE,
} from 'constants/ActionConstants';
import MessageRecord from 'records/MessageRecord';

const { INITIAL, IN_PROGRESS, DONE, ERROR } = StatusConstants;

export class MessageStateRecord extends Record({
	status: INITIAL,
	messages: new List(),
}) {
	status: $Keys<typeof StatusConstants>;
	messages: List<MessageStateRecord>;
}

export default createReducer(new MessageStateRecord(), {
	[GET_MESSAGES]: function(state) {
		return state.set('status', IN_PROGRESS);
	},
	[GET_MESSAGES_SUCCESS]: function(state, { payload }) {
		return new MessageStateRecord({
			status: DONE,
			messages: List(payload.map((message) => new MessageRecord(message))),
		});
	},
	[GET_MESSAGES_FAILED]: function() {
		return new MessageStateRecord({ status: ERROR });
	},
	[SEND_MESSAGE]: function(state) {
		return state.set('status', IN_PROGRESS);
	},
	[SEND_MESSAGE_SUCCESS]: function(state, { payload }) {
		return state.withMutations((state) => {
			const newMessage = new MessageRecord(payload);
			state.update('messages', (messages) => {
				if (messages.includes(newMessage)) {
					return messages.push(newMessage);
				} else {
					return messages;
				}
			});
			state.set('status', DONE);
		});
	},
	[SEND_MESSAGE_FAILED]: function(state) {
		return state.set('status', ERROR);
	},
});
