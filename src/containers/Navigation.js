// @flow
import React, { PureComponent, type Node } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import SuggestBook from 'containers/SuggestBook';
import ScheduleMeeting from 'containers/ScheduleMeeting';
import MyClubs from 'containers/MyClubs';
import { selectTab } from 'actions/AppActions';
import CurrentClub from 'containers/CurrentClub';
import { logout } from 'actions/UserActions';

export const navTabs = [CurrentClub, SuggestBook, ScheduleMeeting, MyClubs];

const mapDispatchToProps = (dispatch) => ({
	selectTab: (...args) => dispatch(selectTab(...args)),
	logout: () => dispatch(logout()),
});

const mapStateToProps = ({ app: { tabIndex }, user: { id } }) => ({ tabIndex, loggedIn: !!id });

type Props = {
	loggedIn: boolean,
	logout: () => void,
	selectTab: (number) => void,
	tabIndex: PureComponent<*>,
};

export class Navigation extends PureComponent<Props> {
	onClick = (e: SyntheticEvent<HTMLElement>) => {
		this.props.selectTab(parseInt(e.currentTarget.getAttribute('data-tabindex'), 10));
	};

	renderTabs(): Array<Node> {
		return navTabs.map(({ navString }, index) => {
			const className = classnames(['nav-link', { active: index === this.props.tabIndex }]);
			return (
				<li key={`${navString}-${index}`} className="nav-item">
					<a className={className} data-tabindex={index} onClick={this.onClick}>
						{navString}
					</a>
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
