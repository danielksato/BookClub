const { Message } = require('../models');
const { activeClubUser } = require('./middleware');
const errorHandler = require('./errorHandler');

module.exports = function(app) {
	app.get('/club/:clubId/messages', activeClubUser, async (req, res) => {
		try {
			const { club } = req;
			const messages = await club.getMessages();
			res.json(messages);
		} catch (err) {
			errorHandler(res)(err);
		}
	});

	app.post('/club/:clubId/message', activeClubUser, async (req, res) => {
		try {
			const { club, user, body: { message } } = req;
			const newMessage = await Message.create({
				clubId: club.id,
				message,
				userId: user.id,
			});
			res.json(newMessage);
		} catch (err) {
			errorHandler(res)(err);
		}
	});
};
