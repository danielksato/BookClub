const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', {
	dialect: 'sqlite',
	storage: './db/data/db.sqlite',
});

const User = sequelize.define('user', {
	firstName: { type: Sequelize.STRING },
	lastName: { type: Sequelize.STRING },
	email: { type: Sequelize.STRING },
});

User.getMembershipsById = function(id) {
	return this.findById(id, {
		include: [{ model: Club, attributes: ['id'], through: { attributes: ['role'] } }],
	});
};

const Club = sequelize.define('club', {
	name: { type: Sequelize.STRING },
});

const Book = sequelize.define('book', {
	title: { type: Sequelize.STRING },
	author: { type: Sequelize.STRING },
	isbn: { type: Sequelize.STRING },
});
const Vote = sequelize.define('vote', {
	for: { type: Sequelize.BOOLEAN },
});

const Membership = sequelize.define('membership', { role: { type: Sequelize.ENUM('invited', 'active', 'admin') } });
const Selection = sequelize.define('selection', {
	status: { type: Sequelize.ENUM('proposed', 'selected', 'archived') },
});

User.belongsToMany(Club, { through: Membership });
Club.belongsToMany(User, { through: Membership });
Club.belongsToMany(Book, { through: Selection });
User.belongsToMany(Book, { through: Vote });
Book.belongsToMany(User, { through: Vote });

module.exports = {
	User,
	Club,
	Membership,
	Vote,
	Selection,
	Book,
};
