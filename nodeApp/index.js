const express = require('express');
const app = express();
const controllers = require('./controllers');
const auth = require('./auth');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

app.use(express.static('public'));
app.use(require('cookie-parser')());
app.use(express.json());
app.use(
	session({
		resave: false,
		saveUninitialized: false,
		secret: new Date().toDateString(),
		store: new FileStore({
			path: './db/auth',
		}),
	})
);

auth(app);
controllers(app);

app.listen(8080);
