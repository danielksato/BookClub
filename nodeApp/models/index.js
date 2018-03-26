const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', {
	dialect: 'sqlite',
	storage: 'db/data.sqlite',
	logging: false,
});

const User = sequelize.define('user', {
	firstName: { type: Sequelize.STRING },
	lastName: { type: Sequelize.STRING },
	email: { type: Sequelize.STRING },
	googleId: { type: Sequelize.STRING },
});

const Club = sequelize.define('club', {
	name: { type: Sequelize.STRING },
});

const Book = sequelize.define('book', {
	author: { type: Sequelize.STRING },
	image: { type: Sequelize.STRING },
	isbn: { type: Sequelize.STRING },
	length: { type: Sequelize.INTEGER },
	link: { type: Sequelize.STRING },
	thumbnail: { type: Sequelize.STRING },
	title: { type: Sequelize.STRING },
});

const Vote = sequelize.define('vote', {
	for: { type: Sequelize.BOOLEAN, defaultValue: true },
});

const Membership = sequelize.define('membership', {
	role: { type: Sequelize.ENUM('invited', 'active', 'admin'), defaultValue: 'active' },
});
const Selection = sequelize.define('selection', {
	status: { type: Sequelize.ENUM('proposed', 'selected', 'archived'), defaultValue: 'proposed' },
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
