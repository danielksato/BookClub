// @flow
import React, { PureComponent, type Node } from 'react';
import { ADMIN } from 'constants/AppConstants';
import type { UserRecord } from 'reducers/UserReducer';

import styles from 'styles/Member.scss';

type Props = {
	user: UserRecord,
	onRemove: ?(number) => void,
};

export default class Member extends PureComponent<Props> {
	onRemove = (): void => {
		const { user: { id }, onRemove } = this.props;
		onRemove && onRemove(id);
	};
	renderMember(): Node {
		const { firstName, lastName, email, role } = this.props.user;
		const admin = role === ADMIN ? <span>({role})</span> : null;
		const displayName = firstName ? `${firstName} ${lastName}` : email;
		return (
			<div className={styles.container}>
				<span data-role={role}>{displayName}</span>
				{admin}
			</div>
		);
	}

	render(): Node {
		const { onRemove } = this.props;
		return onRemove ? <a onClick={this.onRemove}>{this.renderMember()}</a> : this.renderMember();
	}
}
