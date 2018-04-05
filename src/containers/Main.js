// @flow
import React, { PureComponent, Fragment, type Node } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import { authUser } from 'actions/UserActions';

import { navTabs } from './Navigation';
import { Route, withRouter } from 'react-router-dom';
import CurrentClub from './CurrentClub';

const mapStateToProps = ({ user: { id } }) => ({ loggedIn: !!id });
const mapDispatchToProps = { authUser };

type Props = {
	loggedIn: boolean,
	authUser: () => Promise<any>,
};

export class MainWrapper extends PureComponent<Props> {
	componentDidMount(): void {
		this.props.authUser();
	}

	render(): Node {
		const { loggedIn } = this.props;
		if (!loggedIn) {
			return <Login />;
		}
		return (
			<Fragment>
				<Route exact path="/" component={CurrentClub} />
				{navTabs.map((Component) => (
					<Route
						path={Component.urlParam}
						key={`route-${Component.navString}`}
						component={Component}
					/>
				))}
			</Fragment>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainWrapper));
