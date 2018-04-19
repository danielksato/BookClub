const WebSocket = require('ws');
const { sessionParser } = require('../auth/session');
const https = require('https');
const fs = require('fs');

const sockets = {};
const { PRODUCTION } = process.env;

const verifyClient = ({ req }, done) => {
	sessionParser(req, {}, () => {
		if (req.session.passport) {
			req.user = { id: req.session.passport.user };
		}
		if (req.session.club) {
			req.club = { id: req.session.club.id };
		}
		done(req.user.id);
	});
};

let server = null;

if (!PRODUCTION) {
	server = https.createServer({
		key: fs.readFileSync('./ssl/localhost.key'),
		cert: fs.readFileSync('./ssl/localhost.cert'),
		requestCert: false,
		rejectUnauthorized: false,
	});
	server.listen(4040);
}

const serverOptions = PRODUCTION ? { port: 4040, verifyClient } : { server, verifyClient };

const wss = new WebSocket.Server(serverOptions);

wss.on('connection', (ws, req) => {
	sockets[req.user.id] = ws;
});

module.exports.sockets = sockets;
