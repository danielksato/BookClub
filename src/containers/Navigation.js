// @flow
import React, { PureComponent, type Node } from 'react';
import { connect } from 'react-redux';
import SuggestBook from 'containers/SuggestBook';
import Messages from 'containers/Messages';
import MyClubs from 'containers/MyClubs';
import CurrentClub from 'containers/CurrentClub';
import { logout } from 'actions/UserActions';
import { Link } from 'react-router-dom';
import Me from 'containers/Me';

export const navTabs = [CurrentClub, SuggestBook, Messages, MyClubs, Me];

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logout()),
});

const mapStateToProps = ({ user: { id } }) => ({ loggedIn: !!id });

type Props = {
	loggedIn: boolean,
	logout: () => void,
};

export class Navigation extends PureComponent<Props> {
	renderTabs(): Array<Node> {
		return navTabs.map(({ navString, urlParam }) => {
			const [linkParam] = /^\/\w+/.exec(urlParam);
			return (
				<li key={`nav-${navString}`} className="nav-item">
					<Link className="nav-link" to={linkParam}>
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
