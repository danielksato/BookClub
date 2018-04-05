const session = require('express-session');
const FileStore = require('session-file-store')(session);

const store = new FileStore({
	path: './db/auth',
});

const sessionParser = session({
	resave: false,
	saveUninitialized: false,
	secret: new Date().toDateString(),
	store,
});

module.exports = function(app) {
	app.use(sessionParser);
};

module.exports.sessionParser = sessionParser;
