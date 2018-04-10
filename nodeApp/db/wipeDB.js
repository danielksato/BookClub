const { User, Club, Membership, Book, Selection, Vote, Invitation, Message } = require('../models');

Promise.all(
	[User, Club, Membership, Book, Selection, Vote, Invitation, Message].map((Model) =>
		Model.sync({ force: true })
	)
).then(() => {
	process.exit();
});
