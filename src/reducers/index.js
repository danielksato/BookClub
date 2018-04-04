// @flow
import { combineReducers } from 'redux';

import user from 'reducers/UserReducer';
import club from 'reducers/ClubReducer';
import app from 'reducers/AppReducer';
import message from 'reducers/MessageReducer';

export default combineReducers({
	app,
	club,
	message,
	user,
});
