// @flow
import React, { PureComponent, type Node } from 'react';
import { connect } from 'react-redux';
import { getMessages, sendMessage, receiveMessage } from 'actions/MessageActions';
import preventDefault from 'util/PreventDefault';

import type { UserRecord } from 'reducers/UserReducer';
import type { ClubRecord } from 'reducers/ClubReducer';
import type { MessageStateRecord } from '../reducers/MessageReducer';

import styles from 'styles/Messages.scss';

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

	registerWebSocket = (): void => {
		const { receiveMessage } = this.props;
		this.ws = new WebSocket('ws://dev.book-brunch.com:3000/socket/messages');
		// $FlowFixMe WebSocket isn't typed
		this.ws.addEventListener('message', ({ data }) => {
			receiveMessage(JSON.parse(data));
		});
	};

	getMessages = (): void => {
		const { club: { id }, getMessages } = this.props;
		if (id) {
			getMessages({ clubId: id });
			this.registerWebSocket();
		}
	};

	componentDidMount() {
		this.getMessages();
	}

	componentDidUpdate() {
		if (!this.ws) {
			this.getMessages();
		}
	}

	componentWillUnmount(): void {
		this.ws & this.ws.close();
	}

	onTypeMessage = (e: SyntheticEvent<HTMLInputElement>): void => {
		this.setState({ message: e.currentTarget.value });
	};

	onSendMessage = () => {
		const { message } = this.state;
		const { club: { id }, sendMessage } = this.props;
		sendMessage({ message, clubId: id });
		this.setState({ message: '' });
	};

	renderMessages(): Node {
		const { message: { messages } } = this.props;
		if (!messages.size) {
			return <p className={styles.message}>There are no messages yet. Say hello!</p>;
		}
		return messages.map(({ userId, message, id }) => {
			return (
				<p key={`message-${id}`} className={styles.message}>
					{this.getUser(userId)}: {message}
				</p>
			);
		});
	}

	renderMessageEntry(): Node {
		const { message } = this.state;
		return (
			<form className={styles.messageEntry} onSubmit={preventDefault}>
				<input
					id="message-entry"
					value={message}
					onChange={this.onTypeMessage}
					className="form-control"
				/>
				<label htmlFor="message-entry">Write a message</label>
				<button disabled={!message} onClick={this.onSendMessage} type="submit">
					Send
				</button>
			</form>
		);
	}

	render(): Node {
		const { club: { name } } = this.props;
		return (
			<div className={styles.container}>
				<h2>Messages for {name}</h2>
				<div className={styles.history}>{this.renderMessages()}</div>
				{this.renderMessageEntry()}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
