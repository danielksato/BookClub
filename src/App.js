// @flow
import React, { PureComponent, Fragment, type Node } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import Header from './components/Header';
import Navigation from './components/Navigation';
// import Main from './components/Main';
import Login from './components/Login';

const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends PureComponent<*> {
	componentDidMount(): void {
		//
	}
	render(): Node {
		return (
			<Provider store={store}>
				<Fragment>
					<Header />
					<Navigation />
					<Login />
				</Fragment>
			</Provider>
		);
	}
}

export default App;
