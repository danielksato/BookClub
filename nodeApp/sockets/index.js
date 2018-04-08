const WebSocket = require('ws');
const { sessionParser } = require('../auth/session');

const sockets = {};

module.exports = function(app) {
	const wss = new WebSocket.Server({
		server: app,
		verifyClient: ({ req }, done) => {
			sessionParser(req, {}, () => {
				if (req.session.passport) {
					req.user = { id: req.session.passport.user };
				}
				if (req.session.club) {
					req.club = { id: req.session.club.id };
				}
				done(req.user.id);
			});
		},
	});

	wss.on('connection', (ws, req) => {
		sockets[req.user.id] = ws;
		ws.on('close', () => {
			sockets[req.user.id] = null;
		});
	});
};

module.exports.sockets = sockets;
