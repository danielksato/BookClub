// @flow
import { Record } from 'immutable';

export default class ModalRecord extends Record({
	isOpen: false,
	onConfirm: () => {},
	text: '',
	title: '',
}) {
	isOpen: boolean;
	onConfirm: () => void;
	text: string;
	title: string;
}
