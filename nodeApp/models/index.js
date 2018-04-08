const Sequelize = require('sequelize');

let sequelize;

// if (!process.env.PRODUCTION) {
sequelize = new Sequelize('database', 'user', 'password', {
	dialect: 'sqlite',
	storage: 'db/data.sqlite',
	logging: false,
});
// }

const User = sequelize.define(
	'user',
	{
		firstName: { type: Sequelize.STRING },
		lastName: { type: Sequelize.STRING },
		email: { type: Sequelize.STRING },
		googleId: { type: Sequelize.STRING },
		password: { type: Sequelize.STRING },
	},
	{
		defaultScope: {
			attributes: {
				exclude: ['password'],
			},
		},
		scopes: {
			withPassword: {},
		},
	}
);

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
	inFavor: { type: Sequelize.BOOLEAN, defaultValue: true },
});

const Club = sequelize.define(
	'club',
	{
		name: { type: Sequelize.STRING },
	},
	{
		defaultScope: {
			include: [
				{
					model: Book,
					include: { model: Vote },
				},
				{
					model: User,
					through: {
						attributes: ['role'],
					},
				},
			],
		},
	}
);

const Membership = sequelize.define('membership', {
	role: { type: Sequelize.ENUM('invited', 'active', 'admin'), defaultValue: 'active' },
});

const Selection = sequelize.define('selection', {
	status: { type: Sequelize.ENUM('proposed', 'selected', 'archived'), defaultValue: 'proposed' },
});

const Invitation = sequelize.define('invitation', {
	uuid: { type: Sequelize.STRING },
});

const Message = sequelize.define('message', {
	message: { type: Sequelize.TEXT },
});

User.belongsToMany(Club, { through: Membership });
Club.belongsToMany(User, { through: Membership });
Club.belongsToMany(Book, { through: Selection });

Club.hasMany(Vote);
Book.hasMany(Vote);
User.hasMany(Vote);
Vote.belongsTo(Club);
Vote.belongsTo(Book);
Vote.belongsTo(User);
User.hasMany(Invitation);
Message.belongsTo(User);
Message.belongsTo(Club);
Club.hasMany(Message);
User.hasMany(Message);

module.exports = {
	Book,
	Club,
	Invitation,
	Membership,
	Selection,
	User,
	Vote,
	Message,
};
