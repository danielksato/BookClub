// @flow
import React, { PureComponent } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import ModalRecord from 'records/ModalRecord';
import { closeModal } from 'actions/ModalActions';

import styles from 'styles/ConfirmationModal.scss';

const mapStateToProps = ({ modal }) => ({ modal });
const mapDispatchToProps = (dispatch) => ({ closeModal: () => dispatch(closeModal()) });

type Props = {
	modal: ModalRecord,
	closeModal: () => void,
};

export class ConfirmationModal extends PureComponent<Props> {
	onConfirm = (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		this.props.modal.onConfirm();
		this.props.closeModal();
	};

	render() {
		const {
			modal: { isOpen, title, text },
			closeModal,
		} = this.props;
		return (
			<Modal isOpen={isOpen} className={styles.modal} onRequestClose={closeModal}>
				<h2>{title}</h2>
				<p>{text}</p>
				<div className={styles.buttons}>
					<button onClick={this.onConfirm}>Confirm</button>
					<button onClick={closeModal}>Cancel</button>
				</div>
			</Modal>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal);
