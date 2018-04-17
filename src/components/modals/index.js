// @flow
import type { OpenModalParams } from 'actions/ModalActions';

export const deleteClub = ({
	clubName,
	onConfirm,
}: {
	clubName: string,
	onConfirm: () => void,
}): OpenModalParams => {
	return {
		title: 'Confirm Club Deletion',
		text: `Are you sure you want to delete "${clubName}?"`,
		onConfirm,
	};
};

export const createClub = ({
	clubName,
	onConfirm,
}: {
	clubName: string,
	onConfirm: () => void,
}): OpenModalParams => {
	return {
		title: 'Confirm Club Creation',
		text: `Are you sure you want to create "${clubName}?"`,
		onConfirm,
	};
};

export const suggestBook = ({
	bookName,
	onConfirm,
}: {
	bookName: string,
	onConfirm: () => void,
}): OpenModalParams => {
	return {
		title: 'Confirm Book Suggestion',
		text: `Are you sure you want to suggest "${bookName}?"`,
		onConfirm,
	};
};

export const confirmChanges = ({ onConfirm }: { onConfirm: () => void }): OpenModalParams => {
	return {
		title: 'Confirm Changes',
		text: 'Confirm your changes?',
		onConfirm,
	};
};
