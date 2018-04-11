const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();
const controllers = require('./controllers');
const auth = require('./auth');
const proxy = require('http-proxy-middleware');
require('./sockets');

if (process.env.PRODUCTION) {
	app.use(express.static('../build'));
}

app.use('/api/*', (req, res) => {
	req.url = req.baseUrl.replace('/api', '');
	app.handle(req, res);
});

app.use(require('cookie-parser')());
app.use(express.json());

auth(app);
controllers(app);

if (process.env.PRODUCTION) {
	app.use('*', (req, res) => {
		res.sendFile('index.html', { root: '../build' });
	});
} else {
	app.use('*', proxy({ target: 'http://dev.book-brunch.com:3000', changeOrigin: true, ws: true }));
}

if (process.env.PRODUCTION) {
	app.listen(8080);
} else {
	const server = https.createServer(
		{
			key: fs.readFileSync('./ssl/localhost.key'),
			cert: fs.readFileSync('./ssl/localhost.cert'),
			requestCert: false,
			rejectUnauthorized: false,
		},
		app
	);
	server.listen(8080);
}
