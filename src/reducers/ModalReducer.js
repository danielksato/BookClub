// @flow
import { createReducer } from 'redux-create-reducer';
import ModalRecord from 'records/ModalRecord';
import { OPEN_MODAL, CLOSE_MODAL } from 'constants/ActionConstants';
import type { OpenModalParams } from 'actions/ModalActions';
import type { Action } from 'actions';

export default createReducer(new ModalRecord(), {
	[OPEN_MODAL]: function(_, { payload }: Action<OpenModalParams>) {
		return new ModalRecord({ isOpen: true, ...payload });
	},
	[CLOSE_MODAL]: function() {
		return new ModalRecord();
	},
});
