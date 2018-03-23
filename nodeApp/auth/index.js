const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../db/db');

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CID,
			clientSecret: process.env.GOOGLE_CS,
			callbackURL: 'http://bookclub-dev.dksato.com:8080/oauth2/callback',
		},
		function(accessToken, refreshToken, profile, cb) {
			const { id, name: { familyName, givenName }, photos, emails } = profile;
			const where = {
				firstName: givenName,
				lastName: familyName,
				googleId: id,
			};
			if (emails) {
				Object.assign(search, { email: emails[0].value });
			}
			User.findOrCreate({ where }).then(
				([user]) => {
					return cb(null, user);
				},
				(err) => {
					return cb(err, null);
				}
			);
		}
	)
);

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id).then((user) => done(null, user), (err) => done(err, null));
});

module.exports = passport;
