// @flow
import React, { PureComponent, type Node } from 'react';
import { connect } from 'react-redux';
import Login from './Login';

import { navTabs } from './Navigation';

const mapStateToProps = ({ app: { tabIndex }, user: { id } }) => ({ tabIndex, loggedIn: !!id });

type Props = {
	tabIndex: number,
	loggedIn: boolean,
};

export class MainWrapper extends PureComponent<Props> {
	render(): Node {
		const { tabIndex, loggedIn } = this.props;
		const Component = loggedIn && navTabs[tabIndex] ? navTabs[tabIndex] : Login;
		return Component ? <Component /> : null;
	}
}

export default connect(mapStateToProps)(MainWrapper);
