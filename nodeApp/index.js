const express = require('express');
const app = express();
const controllers = require('./controllers');
const auth = require('./auth');

app.use(express.static('public'));
app.use(require('cookie-parser')());
app.use(express.json());

auth(app);
controllers(app);

app.listen(8080);
