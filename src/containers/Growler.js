// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import styles from 'styles/Growler.scss';

const mapStateToProps = ({ app }) => ({ error: app.error });

type Props = { error?: Error };

export class Growler extends PureComponent<Props> {
	render() {
		const { error } = this.props;
		if (!error) {
			return null;
		}

		return (
			<div className={styles.growler}>
				<span>{error.toString() || 'An unspecified error occurred'}</span>
			</div>
		);
	}
}

export default connect(mapStateToProps)(Growler);
