const { User, Club, Membership, Book, Selection, Vote } = require('./db/db.js');
const express = require('express');
const app = express();
const models = {
	user: User,
	club: Club,
	membership: Membership,
	book: Book,
	selection: Selection,
	vote: Vote,
};

app.use(express.static('public'));
app.use(require('cookie-parser')());
app.use(require('body-parser')());
app.use(express.json());
app.use(require('express-session')({ secret: 'potato wizard' }));
// app.use(passport.initialize());
// app.use(passport.session());

// app.get('/logout', (req, res) => {
// 	req.logout();
// 	res.status(200);
// 	res.send();
// });

app.get('/user/:id', (req, res) => {
	const { id } = req.params;
	User.getMembershipsById(id).then(
		(user) => {
			res.json(user);
		},
		(error) => {
			res.status(404);
			res.send();
		}
	);
});

app.get('/club/:id', (req, res) => {
	const { id } = req.params;
	Club.findById(id, {
		include: [{ model: Book }, { model: User }],
	}).then(
		(club) => {
			res.json(club);
		},
		(err) => {
			res.error(err);
		}
	);
});

app.post('/:model', (req, res) => {
	const { model } = req.params;
	const data = req.data;
	const Model = models[model];
	Model.create(data).then(
		(modelData) => res.json(modelData),
		(err) => {
			res.status(400);
			res.send(err);
		}
	);
});

app.all('/*', require('http-proxy-middleware')({ target: 'http://localhost:3000', changeOrigin: true, ws: true }));

app.listen(8080);
