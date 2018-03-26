const { User, Club } = require('../models');

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
		User.getMembershipsById(id).then(
			(user) => {
				res.json(user);
			},
			(error) => {
				res.sendStatus(404);
			}
		);
	});

	app.post('/user', ({ body }, res) => {
		User.findOrCreate({ where: { email: body.email } }).then(
			(user) => {
				if (body.password === user[0].password) {
					res.json(user[0]);
				} else {
					res.sendStatus(403);
				}
			},
			(err) => {
				res.sendStatus(500);
			}
		);
	});
};
