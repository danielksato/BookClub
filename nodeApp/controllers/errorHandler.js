module.exports = function(res) {
	return (error) => {
		/* eslint-disable no-console */
		console.log(error);
		/* eslint-enable no-console */
		res.status(400).send();
	};
};
