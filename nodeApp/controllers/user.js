const { User, Club } = require('../models');
const errorHandler = require('./errorHandler');
const bcrypt = require('bcrypt');

User.getMembershipsById = function(id) {
	return this.findById(id, {
		include: [{ model: Club, attributes: ['id', 'name'], through: { attributes: ['role'] } }],
	});
};

module.exports = function(app) {
	app.get('/user', (req, res) => {
		if (req.user) {
			User.getMembershipsById(req.user.id).then(
				(user) => {
					res.json(user);
				},
				() => res.redirect('/')
			);
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
};
