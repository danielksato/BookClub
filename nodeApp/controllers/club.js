const { Club, Selection } = require('../models');
const errorHandler = require('./errorHandler');
const { invitedClubUser } = require('./middleware');

Club.prototype.addBookIfNotPresent = function(book) {
	return this.hasBook(book).then((hasBook) => {
		return hasBook
			? Selection.findAll({ where: { clubId: this.id, bookId: book.id } })
			: this.addBook(book);
	});
};

module.exports = function(app) {
	app.get('/club', async ({ session: { club } }, res) => {
		if (club) {
			const updatedClub = await Club.findById(club.id);
			res.json(updatedClub);
		} else {
			res.json(null);
		}
	});

	app.get('/club/:id', (req, res) => {
		const { id } = req.params;
		Club.findById(id).then((club) => {
			req.session.club = club;
			res.json(club);
		}, errorHandler(res));
	});

	app.post('/club', ({ body, user }, res) => {
		Club.create({ name: body.name }).then(
			(club) =>
				club
					.addUser(user, { through: { role: 'admin' } })
					.then(() => club.reload())
					.then((club) => res.json(club)),
			errorHandler(res)
		);
	});

	app.put('/club/:clubId/accept', invitedClubUser, async ({ club, user: { id } }, res) => {
		let [user] = await club.getUsers({ where: { id }, through: {} });
		await user.membership.update({ role: 'active' });
		user = await user.reload();
		res.json(user);
	});
};
