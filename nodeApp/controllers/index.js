const book = require('./book');
const user = require('./user');
const club = require('./club');
const message = require('./message');

module.exports = function(app, io) {
	user(app);
	book(app);
	club(app);
	message(app, io);
};
