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
		const { firstName, lastName, role } = this.props.user;
		const admin = role === ADMIN ? <span className={styles.role}>({role})</span> : null;
		return (
			<div className={styles.container}>
				<span data-role={role}>
					{firstName} {lastName}
				</span>
				{admin}
			</div>
		);
	}
}
