const WebSocket = require('ws');
const { sessionParser } = require('../auth/session');

const wss = new WebSocket.Server({
	port: 4040,
	verifyClient: ({ req }, done) => {
		sessionParser(req, {}, () => {
			req.user = { id: req.session.passport.user };
			done(req.user.id);
		});
	},
});

const sockets = {};

wss.on('connection', (ws, req) => {
	sockets[req.user.id] = ws;
	ws.on('close', () => {
		sockets[req.user.id] = null;
	});
});

module.exports = sockets;
