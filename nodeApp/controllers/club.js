const { Club, Book, User } = require('../models');

module.exports = function(app) {
	app.get('/club/:id', (req, res) => {
		const { id } = req.params;
		Club.findById(id, {
			include: [{ model: Book }, { model: User }],
		}).then(
			(club) => {
				res.json(club);
			},
			(err) => {
				res.sendStatus(404);
			}
		);
	});

	app.post('/club', ({ body, user }, res) => {
		Club.create({ name: body.name }).then(
			(club) =>
				club
					.addUser(user)
					.then(() =>
						// this is slow. Maybe do this optimistically?
						club.reload({
							include: [{ model: Book }, { model: User }],
						})
					)
					.then((club) => res.json(club)),
			(err) => res.sendStatus(500)
		);
	});
};
