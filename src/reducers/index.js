// @flow
import { combineReducers } from 'redux';

import user from 'reducers/UserReducer';
import club from 'reducers/ClubReducer';
import app from 'reducers/AppReducer';
import message from 'reducers/MessageReducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
	app,
	club,
	message,
	user,
	route: routerReducer,
});
