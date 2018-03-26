const express = require('express');
const app = express();
const controllers = require('./controllers');
const auth = require('./auth');

app.use(express.static('public'));
app.use(require('cookie-parser')());
app.use(require('body-parser')());
app.use(express.json());
app.use(require('express-session')({ secret: 'potato' }));

auth(app);
controllers(app);

app.listen(8080);
