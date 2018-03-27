// @flow
import React, { PureComponent, Fragment, type Node } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import Header from './components/Header';
import Main from './components/Main';
import Growler from './components/Growler';

const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends PureComponent<*> {
	render(): Node {
		return (
			<Provider store={store}>
				<Fragment>
					<Growler />
					<Header />
					<Main />
				</Fragment>
			</Provider>
		);
	}
}

export default App;
