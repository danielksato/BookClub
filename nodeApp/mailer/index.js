const nodeMailer = require('nodemailer');
const { SMTP_SERVER, SMTP_USER, SMTP_PASSWORD, SMTP_PORT, PRODUCTION } = process.env;

const transporter = nodeMailer.createTransport({
	host: SMTP_SERVER,
	port: SMTP_PORT,
	name: 'book-brunch.com',
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
	if (PRODUCTION) {
		transporter.sendMail({
			to: email,
			text:
				"You've been invite to join BookBrunch. Please create an account at http://www.book-brunch.com.",
			html: 'You\'ve been invite to join <a href="http://www.book-brunch.com">BookBrunch</a>.',
			...baseOptions,
		});
	}
};
