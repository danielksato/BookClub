// @flow
import React, { PureComponent, type Node } from 'react';
import { connect } from 'react-redux';

import { navTabs } from './Navigation';

const mapStateToProps = ({ app: { tabIndex } }) => ({ tabIndex });

type Props = {
	tabIndex: ?number,
};

export class MainWrapper extends PureComponent<Props> {
	render(): Node {
		const { tabIndex } = this.props;
		const Component = tabIndex && navTabs[tabIndex] ? navTabs[tabIndex] : null;
		return Component ? <Component /> : null;
	}
}

export default connect(mapStateToProps)(MainWrapper);
