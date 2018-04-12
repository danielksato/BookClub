const { User, Club, Invitation } = require('../models');
const errorHandler = require('./errorHandler');
const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');
const { activeClubUser, adminClubUser } = require('./middleware');
const inviteMailer = require('../mailer');

module.exports = function(app) {
	app.get('/user', (req, res) => {
		if (req.user) {
			User.findById(req.user.id).then((user) => {
				res.json(user);
			});
		} else {
			res.sendStatus(401);
		}
	});

	app.get('/user/:id', (req, res) => {
		const { id } = req.params;
		User.findById(id).then((user) => {
			res.json(user);
		}, errorHandler(res));
	});

	async function stripPassword(userPromise) {
		const { get } = await userPromise;
		const { password, ...rest } = get();
		return rest;
	}

	app.post('/user', async ({ body }, res) => {
		const { email, password, ...rest } = body;
		try {
			const hash = await bcrypt.hash(password, 10);
			const [user, created] = await User.scope('withPassword').findOrCreate({
				where: { email: body.email },
				defaults: { password: hash, ...rest },
			});
			if (created) {
				const { password, ...userData } = user.get();
				res.json(userData);
			} else {
				if (!user.password) {
					const updatedUser = await user.update({ password: hash, ...rest });
					const { password, ...userData } = updatedUser.get();
					res.json(userData);
				} else if (password) {
					const passwordValid = await bcrypt.compare(password, user.password);
					if (passwordValid) {
						const updatedUser = await user.update(rest);
						const { password, ...userData } = updatedUser.get();
						res.json(userData);
					} else {
						res.sendStatus(403);
					}
				}
			}
		} catch (err) {
			errorHandler(res);
		}
	});

	app.post('/club/:clubId/invite', activeClubUser, async ({ body: { email }, club, user }, res) => {
		try {
			const [newUser, sendMail] = await User.findOrCreate({ where: { email } });
			const invitation = await Invitation.create({ uuid: uuidv1() });
			await Promise.all([
				newUser.addInvitation(invitation),
				club.addUser(newUser, { through: { role: 'invited' } }),
			]);
			sendMail && inviteMailer({ email });
			const updatedClub = await club.reload();
			res.json({
				club: updatedClub,
				invitation,
			});
		} catch (err) {
			errorHandler(res);
		}
	});

	app.delete(
		'/club/:clubId/user/:userId',
		adminClubUser,
		async ({ params: { clubId, userId } }, res) => {
			res.sendStatus(202);
			try {
				const { users } = await Club.scope('forUser').findById(clubId, {
					include: [{ model: User, through: {}, where: { id: userId } }],
				});
				const [user] = users;
				await user.membership.destroy();
			} catch (err) {
				errorHandler(res);
			}
		}
	);
};
