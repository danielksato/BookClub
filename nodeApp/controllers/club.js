const { Club, Book, User, Selection, Vote } = require('../models');
const errorHandler = require('./errorHandler');

Club.prototype.addBookIfNotPresent = function(book) {
	return this.hasBook(book).then((hasBook) => {
		return hasBook
			? Selection.findAll({ where: { clubId: this.id, bookId: book.id } })
			: this.addBook(book);
	});
};

module.exports = function(app) {
	app.get('/club/:id', (req, res) => {
		const { id } = req.params;
		Club.findById(id, {
			include: [{ model: Book, include: { model: Vote } }, { model: User }],
		}).then((club) => {
			res.json(club);
		}, errorHandler(res));
	});

	app.post('/club', ({ body, user }, res) => {
		Club.create({ name: body.name }).then(
			(club) =>
				club
					.addUser(user, { through: { role: 'admin' } })
					.then(() =>
						// this is slow. Maybe do this optimistically?
						club.reload({
							include: [
								{
									model: Book,
									include: { model: Vote },
								},
								{ model: User },
							],
						})
					)
					.then((club) => res.json(club)),
			errorHandler(res)
		);
	});
};
