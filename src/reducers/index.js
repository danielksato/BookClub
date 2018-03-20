// @flow
import { combineReducers } from 'redux';

import userReducer from './UserReducer';
import clubReducer from './ClubReducer';
import appReducer from './AppReducer';

export default combineReducers({
	app: appReducer,
	user: userReducer,
	club: clubReducer,
});
