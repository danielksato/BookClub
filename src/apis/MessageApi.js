// @flow
import { sendJSON } from 'apis/ApiUtils';

export type MessageResponse = {
	clubId: number,
	id: number,
	updatedAt: string,
	userId: number,
	message: string,
};

export const getMessages = ({ clubId }: { clubId: number }): Promise<Array<MessageResponse>> => {
	return fetch(`/api/club/${clubId}/messages`, { credentials: 'include' }).then((res) =>
		res.json()
	);
};

export const sendMessage = ({
	clubId,
	message,
}: {
	clubId: number,
	message: string,
}): Promise<MessageResponse> => {
	return sendJSON(`/api/club/${clubId}/message`, { body: { message } });
};
