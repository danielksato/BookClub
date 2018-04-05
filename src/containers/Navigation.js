// @flow
import React, { PureComponent, type Node } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import SuggestBook from 'containers/SuggestBook';
import Messages from 'containers/Messages';
import MyClubs from 'containers/MyClubs';
import CurrentClub from 'containers/CurrentClub';
import { logout } from 'actions/UserActions';
import { Link } from 'react-router-dom';

export const navTabs = [CurrentClub, SuggestBook, Messages, MyClubs];

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logout()),
});

const mapStateToProps = ({ app: { tabIndex }, user: { id } }) => ({ tabIndex, loggedIn: !!id });

type Props = {
	loggedIn: boolean,
	logout: () => void,
	tabIndex: PureComponent<*>,
};

export class Navigation extends PureComponent<Props> {
	renderTabs(): Array<Node> {
		return navTabs.map(({ navString, urlParam }, index) => {
			const className = classnames(['nav-link', { active: index === this.props.tabIndex }]);
			const [linkParam] = /^\/\w+/.exec(urlParam);
			return (
				<li key={`${navString}-${index}`} className="nav-item">
					<Link className={className} data-tabindex={index} to={linkParam}>
						{navString}
					</Link>
				</li>
			);
		});
	}

	render(): Node {
		return (
			this.props.loggedIn && (
				<ul className="navbar-nav">
					{this.renderTabs()}
					<li className="nav-item">
						<a className="nav-link" onClick={this.props.logout}>
							Log Out
						</a>
					</li>
				</ul>
			)
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
