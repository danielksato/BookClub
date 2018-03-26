const book = require('./book');
const user = require('./user');
const club = require('./club');

module.exports = function(app) {
	user(app);
	book(app);
	club(app);
};
