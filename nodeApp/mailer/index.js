const nodeMailer = require('nodemailer');
const { SMTP_SERVER, SMTP_USER, SMTP_PASSWORD, PRODUCTION } = process.env;

const transporter = nodeMailer.createTransport({
	host: SMTP_SERVER,
	port: 465,
	secure: true,
	auth: {
		user: SMTP_USER,
		pass: SMTP_PASSWORD,
	},
});

const baseOptions = {
	from: '"Daniel at BookBrunch" <daniel@book-brunch.com>', // sender address
	subject: 'Welcome to BookBrunch', // Subject line
};

module.exports = function({ email }) {
	transporter.sendMail({
		to: email,
		text:
			"You've been invite to join BookBrunch. Please create an account at http://www.book-brunch.com.",
		html: 'You\'ve been invite to join <a href="http://www.book-brunch.com">BookBrunch</a>.',
		...baseOptions,
	});
};
