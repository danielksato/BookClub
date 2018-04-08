const { Message } = require('../models');
const { activeClubUser } = require('./middleware');
const errorHandler = require('./errorHandler');
const { sockets } = require('../sockets');

const clubSubscribers = {};

const addClubSubscriber = ({ clubId, userId }) => {
	if (!clubSubscribers[clubId]) {
		clubSubscribers[clubId] = {};
	}
	if (sockets[userId]) {
		clubSubscribers[clubId][userId] = sockets[userId];
	}
};

const messageClubSubscribers = ({ clubId, message, userId }) => {
	if (!clubSubscribers[clubId]) {
		return;
	}
	Object.entries(clubSubscribers[clubId])
		.filter(([id, ws]) => ws && parseInt(id, 10) !== userId) // numerical keys in POJOs suck
		.forEach(([_, ws]) => {
			try {
				ws.send(JSON.stringify(message));
			} catch (err) {
				/* eslint-disable no-console */
				console.log(err);
				/* eslint-enable no-console */
			}
		});
};

module.exports = function(app) {
	app.get('/club/:clubId/messages', activeClubUser, async (req, res) => {
		try {
			const { club } = req;
			const messages = await club.getMessages();
			addClubSubscriber({ clubId: club.id, userId: req.user.id });
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
			messageClubSubscribers({ clubId, message: newMessage, userId });
			res.json(newMessage);
		} catch (err) {
			errorHandler(res)(err);
		}
	});
};
