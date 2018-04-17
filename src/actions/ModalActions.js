// @flow
import { createAction, type ActionCreator } from 'actions';
import { OPEN_MODAL, CLOSE_MODAL } from 'constants/ActionConstants';

export type OpenModalParams = {
	title: string,
	text: string,
	onConfirm: () => void,
};

export const openModal: ActionCreator<OpenModalParams> = createAction(OPEN_MODAL);
export const closeModal: ActionCreator<> = createAction(CLOSE_MODAL);
