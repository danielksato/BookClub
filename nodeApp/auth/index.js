const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');
const bcrypt = require('bcrypt');

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://bookclub-dev.dksato.com:3000/oauth2/callback',
		},
		function(accessToken, refreshToken, profile, cb) {
			const { id, name: { familyName, givenName }, emails } = profile;

			const where = emails ? { email: emails[0].value } : { googleId: id };
			User.findOne({ where }).then(
				(user) => {
					if (user) {
						cb(null, user);
					} else {
						User.create(
							Object.assign(
								{
									firstName: givenName,
									lastName: familyName,
									googleId: id,
								},
								where
							)
						).then((newUser) => cb(null, newUser), (err) => cb(err, null));
					}
				},
				(err) => {
					return cb(err, null);
				}
			);
		}
	)
);

passport.use(
	new LocalStrategy({ usernameField: 'email' }, async (username, password, cb) => {
		try {
			const user = await User.scope('withPassword').findOne({ where: { email: username } });
			console.log(user);
			console.log(user.password);
			console.log(password);
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

module.exports = function(app) {
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

	app.post('/login', passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
		res.redirect('/user');
	});

	app.put('/logout', (req, res) => {
		req.logout();
		res.sendStatus(200);
	});
};
