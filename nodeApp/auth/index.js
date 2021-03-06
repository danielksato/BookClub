const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');
const bcrypt = require('bcrypt');
const session = require('./session');

const oauthVerify = async (accessToken, refreshToken, profile, cb) => {
	try {
		const {
			name: { familyName, givenName },
			emails,
		} = profile;
		const email = emails[0].value;
		if (!email) {
			throw new Error('no email');
		}
		const [user, created] = await User.findOrCreate({
			where: { email },
			defaults: {
				firstName: givenName,
				lastName: familyName,
			},
		});
		if (!created) {
			cb(null, user);
		} else {
			const newUser = await user.update({
				firstName: givenName,
				lastName: familyName,
			});
			cb(null, newUser);
		}
	} catch (err) {
		return cb(err, null);
	}
};

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.PRODUCTION
				? 'https://www.book-brunch.com/api/oauth2/callback'
				: 'https://dev.book-brunch.com:8080/api/oauth2/callback',
		},
		oauthVerify
	)
);

passport.use(
	new FacebookStrategy(
		{
			clientID: process.env.FB_APP_ID,
			clientSecret: process.env.FB_APP_SECRET,
			callbackURL: process.env.PRODUCTION
				? 'https://www.book-brunch.com/api/oauth2/facebook/callback'
				: 'https://dev.book-brunch.com:8080/api/oauth2/facebook/callback',
			profileFields: ['id', 'name', 'email'],
		},
		oauthVerify
	)
);

passport.use(
	new LocalStrategy({ usernameField: 'email' }, async (username, password, cb) => {
		try {
			const user = await User.scope('withPassword').findOne({ where: { email: username } });
			const passwordValid = await bcrypt.compare(password, user.password);
			if (!(user && passwordValid)) {
				return cb(null, false);
			} else {
				return cb(null, user);
			}
		} catch (err) {
			return cb(err);
		}
	})
);

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id).then((user) => done(null, user), (err) => done(err, null));
});

const passportSession = passport.session();

module.exports = function(app) {
	session(app);
	app.use(passport.initialize());
	app.use(passportSession);

	app.get('/oauth2', passport.authenticate('google', { scope: ['profile', 'email'] }));
	app.get(
		'/oauth2/callback',
		passport.authenticate('google', {
			failureRedirect: '/',
		}),
		(req, res) => res.redirect('/')
	);

	app.get(
		'/oauth2/facebook',
		passport.authenticate('facebook', { scope: ['public_profile', 'email'] })
	);
	app.get(
		'/oauth2/facebook/callback',
		passport.authenticate('facebook', {
			failureRedirect: '/',
		}),
		(req, res) => res.redirect('/')
	);

	app.post('/login', passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
		res.redirect('/api/user');
	});

	app.put('/logout', (req, res) => {
		req.session.destroy();
		res.sendStatus(200);
	});
};

module.exports.passportSession = passportSession;
