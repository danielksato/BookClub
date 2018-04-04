const { User, Club, Invitation } = require('../models');
const errorHandler = require('./errorHandler');
const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');
const { activeClubUser } = require('./middleware');

User.getMembershipsById = function(id) {
	return this.findById(id, {
		include: [{ model: Club, attributes: ['id', 'name'], through: { attributes: ['role'] } }],
	});
};

module.exports = function(app) {
	app.get('/user', (req, res) => {
		if (req.user) {
			User.getMembershipsById(req.user.id).then((user) => {
				res.json(user);
			});
		} else {
			res.sendStatus(401);
		}
	});

	app.get('/user/:id', (req, res) => {
		const { id } = req.params;
		User.getMembershipsById(id).then((user) => {
			res.json(user);
		}, errorHandler(res));
	});

	app.post('/user', async ({ body }, res) => {
		const { email, password, ...rest } = body;
		try {
			const hash = await bcrypt.hash(password, 10);
			const [user, created] = await User.findOrCreate({
				where: { email: body.email },
				defaults: { password: hash, ...rest },
			});
			if (created) {
				const { password, ...userData } = user.get();
				res.json(userData);
			} else {
				res.sendStatus(403);
			}
		} catch (err) {
			errorHandler(res);
		}
	});

	app.post('/club/:clubId/invite', activeClubUser, async ({ body: { email }, club, user }, res) => {
		try {
			const [newUser] = await User.findOrCreate({ where: { email } });
			const invitation = await Invitation.create({ uuid: uuidv1() });
			await Promise.all([
				newUser.addInvitation(invitation),
				club.addUser(newUser, { through: { role: 'invited' } }),
			]);
			res.json({
				club: await club.reload(),
				invitation,
			});
		} catch (err) {
			errorHandler(res);
		}
	});
};
