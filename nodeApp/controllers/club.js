const { Club, Selection } = require('../models');
const errorHandler = require('./errorHandler');
const { invitedClubUser, authedUser } = require('./middleware');

module.exports = function(app) {
	app.get('/club', authedUser, async ({ session: { club } }, res) => {
		if (club) {
			const updatedClub = await Club.findById(club.id);
			res.json(updatedClub);
		} else {
			res.json(null);
		}
	});

	app.get('/club/:id', authedUser, (req, res) => {
		const { id } = req.params;
		Club.findById(id).then((club) => {
			req.session.club = club;
			res.json(club);
		}, errorHandler(res));
	});

	app.post('/club', authedUser, (req, res) => {
		const { body, user } = req;
		Club.create({ name: body.name }).then(
			(club) =>
				club
					.addUser(user, { through: { role: 'admin' } })
					.then(() => club.reload())
					.then((club) => {
						req.session.club = club;
						res.json(club);
					}),
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
