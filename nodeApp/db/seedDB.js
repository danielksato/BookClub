const { User, Club, Membership, Book, Selection, Vote } = require('../models');

Promise.all(
	[User, Club, Membership, Book, Selection, Vote].map((Model) => Model.sync({ force: true }))
).then(() => {
	Promise.all([
		User.create({
			firstName: 'Daniel',
			lastName: 'Sato',
			email: 'dksato@gmail.com',
			googleId: '114424838772956984190',
		}),
		Club.create({
			name: 'Bear Club',
		}),
	]).then(([user, club]) => club.addUser(user));
});
