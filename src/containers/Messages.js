// @flow
import React, { PureComponent, type Node } from 'react';
import { connect } from 'react-redux';
import { getMessages, sendMessage } from 'actions/MessageActions';

import type { UserRecord } from 'reducers/UserReducer';
import type { ClubRecord } from 'reducers/ClubReducer';
import type { MessageStateRecord } from '../reducers/MessageReducer';

type Props = {
	user: UserRecord,
	message: MessageStateRecord,
	club: ClubRecord,
	getMessages: (Object) => void,
	sendMessage: (Object) => void,
};

type State = {
	message: string,
};

const mapStateToProps = ({ club, user, message }) => ({ club, user, message });
const mapDispatchToProps = { getMessages, sendMessage };

export class Messages extends PureComponent<Props, State> {
	static navString = 'Messages';
	state = { message: '' };

	getUser = (userId: number): string => {
		const { user: { id }, club: { users } } = this.props;
		if (userId === id) {
			return 'You';
		}
		const user = users.find(({ id }) => id === userId);
		return user ? `${user.firstname} ${user.lastName}` : 'Somebody';
	};

	componentDidMount(): void {
		const { club: { id } } = this.props;
		this.props.getMessages({ clubId: id });
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
