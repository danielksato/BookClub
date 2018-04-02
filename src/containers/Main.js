// @flow
import React, { PureComponent, type Node } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import { authUser } from 'actions/UserActions';

import { navTabs } from './Navigation';

const mapStateToProps = ({ app: { tabIndex }, user: { id } }) => ({ tabIndex, loggedIn: !!id });
const mapDispatchToProps = (dispatch) => ({
	authUser: () => dispatch(authUser()),
});

type Props = {
	tabIndex: number,
	loggedIn: boolean,
	authUser: () => Promise<any>,
};

export class MainWrapper extends PureComponent<Props> {
	componentDidMount(): void {
		this.props.authUser();
	}

	render(): Node {
		const { tabIndex, loggedIn } = this.props;
		const Component = loggedIn && navTabs[tabIndex] ? navTabs[tabIndex] : Login;
		return Component ? <Component /> : null;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainWrapper);
