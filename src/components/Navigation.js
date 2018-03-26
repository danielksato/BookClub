// @flow
import React, { PureComponent, type Node } from 'react';
import { connect } from 'react-redux';
import SuggestBook from './SuggestBook';
import VoteOnBook from './VoteOnBook';
import ScheduleMeeting from './ScheduleMeeting';
import JoinClub from './JoinClub';
import MyClubs from './MyClubs';
import { selectTab } from 'actions/AppActions';
import Home from './Home';

import styles from 'styles/Navigation.module.css';

export const navTabs = [Home, SuggestBook, VoteOnBook, ScheduleMeeting, JoinClub, MyClubs];

const mapDispatchToProps = (dispatch) => ({
	selectTab: (...args) => dispatch(selectTab(...args)),
});

const mapStateToProps = ({ app: { tabIndex }, user: { id } }) => ({ tabIndex, loggedIn: !!id });

type Props = {
	loggedIn: boolean,
	selectTab: (PureComponent<*>) => void,
	tabIndex: PureComponent<*>,
};

export class Navigation extends PureComponent<Props> {
	onClick = (e: SyntheticEvent<>) => {
		// $FlowFixMe getAttribute
		this.props.selectTab(parseInt(e.target.getAttribute('data-tabindex'), 10));
	};

	renderTabs(): Array<Node> {
		return navTabs.map(({ navString }, index) => {
			const className = index === this.props.tabIndex ? styles.selected : null;
			return (
				<div
					key={`${navString}-${index}`}
					data-tabindex={index}
					onClick={this.onClick}
					className={className}
				>
					{navString}
				</div>
			);
		});
	}

	render(): Node {
		return this.props.loggedIn && <div className={styles.container}>{this.renderTabs()}</div>;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
