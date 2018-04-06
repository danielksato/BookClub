const { Club } = require('../models');
const unauth = (res) => res.status(401).send();

const userRole = (roles) => async (req, res, next) => {
	const { clubId } = req.params;
	const { user } = req;
	if (user && clubId) {
		try {
			const club = await Club.findById(clubId);
			const clubUser = club && club.users.find(({ id }) => id === user.id);
			if (clubUser && roles.includes(clubUser.membership.role)) {
				req.club = club;
				return next();
			}
		} catch (err) {
			/* eslint-disable no-console */
			console.log(err);
			return unauth(res);
			/* eslint-enable no-console */
		}
	}
	return unauth(res);
};

const authedUser = ({ user }, res, next) => {
	return user ? next() : unauth(res);
};

module.exports = {
	activeClubUser: userRole(['active', 'admin']),
	adminClubUser: userRole(['admin']),
	authedUser,
	invitedClubUser: userRole(['invited']),
};
