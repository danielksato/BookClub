const express = require('express');
const app = express();
const controllers = require('./controllers');
const auth = require('./auth');
const sockets = require('./sockets');

app.use(express.static('../build'));

app.use('/api/*', (req, res) => {
	req.url = req.baseUrl.replace('/api', '');
	app.handle(req, res);
});

app.use(require('cookie-parser')());
app.use(express.json());

auth(app);
controllers(app);
sockets(app);

app.use('*', (req, res) => {
	res.sendFile('index.html', { root: '../build' });
});

app.listen(8080);
