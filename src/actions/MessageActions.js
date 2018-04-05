// @flow
import {
	getMessages as getMessagesApi,
	sendMessage as sendMessageApi,
	type MessageResponse,
} from 'apis/MessageApi';
import { createAction, type ActionCreator, type ThunkAction } from 'actions';
import {
	GET_MESSAGES_FAILED,
	GET_MESSAGES_SUCCESS,
	GET_MESSAGES,
	SEND_MESSAGE_FAILED,
	SEND_MESSAGE_SUCCESS,
	SEND_MESSAGE,
} from 'constants/ActionConstants';

const _getMessages: ActionCreator<> = createAction(GET_MESSAGES);
const _getMessagesFailed: ActionCreator<> = createAction(GET_MESSAGES_FAILED);
const _getMessagesSuccess: ActionCreator<Array<MessageResponse>> = createAction(
	GET_MESSAGES_SUCCESS
);

export const getMessages = ({ clubId }: { clubId: number }): ThunkAction => {
	return (dispatch) => {
		dispatch(_getMessages());
		getMessagesApi({ clubId })
			.then((messages) => dispatch(_getMessagesSuccess(messages)))
			.catch((err) => dispatch(_getMessagesFailed(err)));
	};
};

const _sendMessage: ActionCreator<> = createAction(SEND_MESSAGE);
const _sendMessageSuccess: ActionCreator<MessageResponse> = createAction(SEND_MESSAGE_SUCCESS);
const _sendMessageFailed: ActionCreator<> = createAction(SEND_MESSAGE_FAILED);

export const receiveMessage = _sendMessageSuccess;

export const sendMessage = ({
	message,
	clubId,
}: {
	message: string,
	clubId: number,
}): ThunkAction => {
	return (dispatch) => {
		dispatch(_sendMessage());
		sendMessageApi({ message, clubId })
			.then((message) => {
				dispatch(_sendMessageSuccess(message));
			})
			.catch((err) => dispatch(_sendMessageFailed(err)));
	};
};
