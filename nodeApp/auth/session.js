const session = require('express-session');
const { db } = require('../models');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const store = new SequelizeStore({ db });
store.sync();

const sessionParser = session({
	cookie: {
		domain: '.book-brunch.com',
	},
	resave: false,
	saveUninitialized: false,
	secret: new Date().toDateString(),
	store,
});

module.exports = function(app) {
	app.use(sessionParser);
};

module.exports.sessionParser = sessionParser;
