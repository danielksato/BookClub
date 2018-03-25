const { User, Club, Membership, Book, Selection, Vote } = require('./db.js');

Promise.all([User, Club, Membership, Book, Selection, Vote].map((Model) => Model.sync({ force: true }))).then(() => {
	// Promise.all([
	// 	User.create({
	// 		firstName: 'Daniel',
	// 		lastName: 'Sato',
	// 		email: 'dksato@gmail.com',
	// 		googleId: '114424838772956984190',
	// 	}),
	// 	Club.create({
	// 		name: 'Bear Club',
	// 	}),
	// 	Book.create({
	// 		title: 'How to pick up chicks: a pragmatic guide for owls',
	// 		author: 'Daniel Sato',
	// 		isbn: '999-XXX-999-XXX',
	// 	}),
	// ])
	// 	.then(
	// 		([user, club, book]) => {
	// 			return Promise.all([
	// 				club.addUser(user, { through: { role: 'admin' } }),
	// 				user.addBook(book, { through: { for: true } }),
	// 				club.addBook(book, { through: { status: 'proposed' } }),
	// 			]);
	// 		},
	// 		(err) => {
	// 			console.log(err);
	// 		}
	// 	)
	// 	.then(() => {
	// 		Promise.all([User, Club, Membership, Book, Selection, Vote].map((Model) => Model.findAll())).then((...args) =>
	// 			console.log(JSON.stringify(args))
	// 		);
	// 	});
});
