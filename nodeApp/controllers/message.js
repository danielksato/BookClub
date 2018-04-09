const { Message, Club } = require('../models');
const { activeClubUser } = require('./middleware');
const errorHandler = require('./errorHandler');
const { sockets } = require('../sockets');

const messageClubSubscribers = async ({ club: { users }, message }) => {
	users.forEach(({ id }) => sockets[id] && sockets[id].send(JSON.stringify(message)));
};

module.exports = function(app) {
	app.get('/club/:clubId/messages', activeClubUser, async (req, res) => {
		try {
			const { club, user } = req;
			const messages = await club.getMessages();
			res.json(messages);
		} catch (err) {
			errorHandler(res)(err);
		}
	});

	app.post('/club/:clubId/message', activeClubUser, async (req, res) => {
		try {
			const { club, user, body: { message } } = req;
			const clubId = club.id;
			const userId = user.id;
			const newMessage = await Message.create({
				clubId,
				message,
				userId,
			});
			messageClubSubscribers({ club, message: newMessage });
			res.json(newMessage);
		} catch (err) {
			errorHandler(res)(err);
		}
	});
};
