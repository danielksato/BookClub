// @flow
import React, { PureComponent, type Node } from 'react';
import { connect } from 'react-redux';
import { getMessages, sendMessage, receiveMessage } from 'actions/MessageActions';

import type { UserRecord } from 'reducers/UserReducer';
import type { ClubRecord } from 'reducers/ClubReducer';
import type { MessageStateRecord } from '../reducers/MessageReducer';

type Props = {
	user: UserRecord,
	message: MessageStateRecord,
	club: ClubRecord,
	getMessages: (Object) => void,
	sendMessage: (Object) => void,
	receiveMessage: (Object) => void,
};

type State = {
	message: string,
};

const mapStateToProps = ({ club, user, message }) => ({ club, user, message });
const mapDispatchToProps = (dispatch) => ({
	getMessages: (...args) => dispatch(getMessages(...args)),
	sendMessage: (...args) => dispatch(sendMessage(...args)),
	receiveMessage: (message) => dispatch(receiveMessage(message)),
});

export class Messages extends PureComponent<Props, State> {
	static navString = 'Messages';
	static urlParam = '/messages';

	state = { message: '' };
	ws: $FlowFixMe;

	getUser = (userId: number): string => {
		const { user: { id }, club: { users } } = this.props;
		if (userId === id) {
			return 'You';
		}
		const user = users.find(({ id }) => id === userId);
		return user ? `${user.firstName} ${user.lastName}` : 'Somebody';
	};

	registerWebSocket = () => {
		const { receiveMessage } = this.props;
		this.ws = new WebSocket('ws://bookclub-dev.dksato.com:3000/socket/messages');
		// $FlowFixMe WebSocket isn't typed
		this.ws.addEventListener('message', ({ data }) => {
			receiveMessage(JSON.parse(data));
		});

		this.ws.addEventListener('close', this.registerWebSocket);
	};

	componentDidMount(): void {
		const { club: { id }, getMessages } = this.props;
		getMessages({ clubId: id });
		this.registerWebSocket();
	}

	componentWillUnmount(): void {
		this.ws.close();
	}

	onTypeMessage = (e: SyntheticEvent<HTMLInputElement>): void => {
		this.setState({ message: e.currentTarget.value });
	};

	onSendMessage = () => {
		const { message } = this.state;
		const { club: { id }, sendMessage } = this.props;
		sendMessage({ message, clubId: id });
	};

	renderMessages(): Node {
		const { message: { messages } } = this.props;
		return messages.map(({ userId, message, id }) => {
			return (
				<div key={`message-${id}`}>
					{this.getUser(userId)}: {message}
				</div>
			);
		});
	}

	renderMessageEntry(): Node {
		const { message } = this.state;
		return (
			<div>
				<input id="message-entry" value={message} onChange={this.onTypeMessage} />
				<label htmlFor="message-entry">Write a message</label>
				<button onClick={this.onSendMessage}>Send</button>
			</div>
		);
	}

	render(): Node {
		const { club: { name } } = this.props;
		return (
			<div>
				<h2>Messages for {name}</h2>
				<div>{this.renderMessages()}</div>
				<div>{this.renderMessageEntry()}</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
