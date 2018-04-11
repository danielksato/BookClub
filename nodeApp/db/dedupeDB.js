const { User, Club, Membership, Book, Selection, Vote, Invitation, Message } = require('../models');

const dedupe = (models, key) => {
	const keyList = models.map((model) => model[key]);
	return Promise.all(
		models.map((model, index) => {
			return keyList.indexOf(model[key]) === index
				? Promise.resolve(null)
				: model.destroy().then(() => console.log('destroy ' + model[key]));
		})
	);
};

const dedupeDB = () => {
	return Promise.all(
		[
			{
				Model: User,
				key: 'email',
			},
			{
				Model: Club,
				key: 'name',
			},
		].map(async ({ Model, key }) => {
			const instances = await Model.findAll();
			return dedupe(instances, key);
		})
	);
};

dedupeDB().then(() => process.exit());
