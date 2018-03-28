// @flow
import React, { PureComponent, type Node } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import { authUser } from 'actions/UserActions';
import { loadClub } from 'actions/ClubActions';

import { navTabs } from './Navigation';

const mapStateToProps = ({ app: { tabIndex }, user: { id } }) => ({ tabIndex, loggedIn: !!id });
const mapDispatchToProps = (dispatch) => ({
	authUser: () => dispatch(authUser()),
	loadClub: (...args) => dispatch(loadClub(...args)),
});

type Props = {
	tabIndex: number,
	loggedIn: boolean,
	loadClub: (id: number) => void,
	authUser: () => Promise<any>,
};

export class MainWrapper extends PureComponent<Props> {
	componentDidMount(): void {
		this.props
			.authUser()
			.then(({ clubs: [{ id }] }) => this.props.loadClub(id))
			.catch(() => {});
	}

	render(): Node {
		const { tabIndex, loggedIn } = this.props;
		const Component = loggedIn && navTabs[tabIndex] ? navTabs[tabIndex] : Login;
		return Component ? <Component /> : null;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainWrapper);
