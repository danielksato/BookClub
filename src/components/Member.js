// @flow
import React, { PureComponent, type Node } from 'react';
import { ADMIN } from 'constants/AppConstants';
import type { UserRecord } from 'reducers/UserReducer';

import styles from 'styles/Member.scss';

type Props = {
	user: UserRecord,
};

export default class Member extends PureComponent<Props> {
	render() {
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
}
