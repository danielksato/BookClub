const express = require('express');
const app = express();
const controllers = require('./controllers');
const auth = require('./auth');
const sockets = require('./sockets');
const proxy = require('http-proxy-middleware');

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
sockets(app);

if (process.env.PRODUCTION) {
	app.use('*', (req, res) => {
		res.sendFile('index.html', { root: '../build' });
	});
} else {
	app.use('*', proxy({ target: 'http://dev.book-brunch.com:3000', changeOrigin: true, ws: true }));
}

app.listen(8080);
