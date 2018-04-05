// @flow
import React, { PureComponent, Fragment, type Node } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';
import Header from 'containers/Header';
import Main from 'containers/Main';
import Growler from 'containers/Growler';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const store = createStore(rootReducer, applyMiddleware(thunk, routerMiddleware(history)));

export default class App extends PureComponent<*> {
	render(): Node {
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<Fragment>
						<Growler />
						<Header />
						<Main />
					</Fragment>
				</ConnectedRouter>
			</Provider>
		);
	}
}
