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

const passport = require('./auth');

app.use(express.static('public'));
app.use(require('cookie-parser')());
app.use(require('body-parser')());
app.use(express.json());
app.use(require('express-session')({ secret: 'potato' }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/oauth2', passport.authenticate('google', { scope: ['profile'] }));
app.get(
	'/oauth2/callback',
	passport.authenticate('google', {
		failureRedirect: '/',
		successRedirect: '/user',
	})
);

app.get('/user', (req, res) => {
	if (req.user) {
		User.getMembershipsById(req.user.id).then(
			(user) => {
				res.json(user);
			},
			() => res.redirect('/')
		);
	} else {
		res.sendStatus(401);
	}
});

app.get('/user/:id', (req, res) => {
	const { id } = req.params;
	User.getMembershipsById(id).then(
		(user) => {
			res.json(user);
		},
		(error) => {
			res.sendStatus(404);
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
			res.sendStatus(404);
		}
	);
});

app.post('/user', ({ body }, res) => {
	User.findOrCreate({ where: { email: body.email } }).then(
		(user) => {
			if (body.password === user[0].password) {
				res.json(user[0]);
			} else {
				res.sendStatus(403);
			}
		},
		(err) => {
			res.sendStatus(500);
		}
	);
});

app.post('/club', ({ body, user }, res) => {
	Club.create({ name: body.name }).then(
		(club) =>
			club
				.addUser(user)
				.then(() =>
					// this is slow. Maybe do this optimistically?
					club.reload({
						include: [{ model: Book }, { model: User }],
					})
				)
				.then((club) => res.json(club)),
		(err) => res.sendStatus(500)
	);
});

app.put('/logout', (req, res) => {
	req.logout();
	res.sendStatus(200);
});

app.all('/*', require('http-proxy-middleware')({ target: 'http://localhost:3000', changeOrigin: true, ws: true }));

app.listen(8080);
