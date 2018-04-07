const { Book, Club, User, Vote, Selection } = require('../models');
const errorHandler = require('./errorHandler');
const { adminClubUser } = require('./middleware');

Book.createByISBN = function(newBook) {
	const { isbn } = newBook;
	return Book.findOne({ where: { isbn } }).then((book) => {
		if (book) {
			return Promise.resolve(book);
		} else {
			return Book.create(newBook);
		}
	});
};

const amazon = require('amazon-product-api');
const {
	AMAZON_PRODUCT_ADVERTISING_ACCESS_KEY,
	AMAZON_PRODUCT_ADVERTISING_SECRET_KEY,
	AMAZON_ASSOCIATE_TAG,
} = process.env;

const client = amazon.createClient({
	awsId: AMAZON_PRODUCT_ADVERTISING_ACCESS_KEY,
	awsSecret: AMAZON_PRODUCT_ADVERTISING_SECRET_KEY,
	awsTag: AMAZON_ASSOCIATE_TAG,
});

module.exports = function(app) {
	app.put('/book/search', (req, res) => {
		const { search } = req.body;
		client
			.itemSearch({
				keywords: search,
				searchIndex: 'Books',
				responseGroup: 'Images,ItemAttributes',
			})
			.then(
				(books) => {
					res.json(
						books
							.map(({ DetailPageURL, ItemAttributes, SmallImage, MediumImage }) => {
								const { Author, NumberOfPages, ISBN, Title } = ItemAttributes
									? ItemAttributes[0]
									: {};
								return {
									author: Author && Author[0],
									image: MediumImage && MediumImage[0].URL[0],
									isbn: ISBN && ISBN[0],
									length: NumberOfPages && NumberOfPages[0],
									link: DetailPageURL && DetailPageURL[0],
									thumbnail: SmallImage && SmallImage[0].URL[0],
									title: Title && Title[0],
								};
							})
							.filter((book) => book.isbn)
					);
				},
				(err) => res.status(400).send(err)
			);
	});

	app.post('/club/:clubId/book', ({ user, body, params }, res) => {
		const { clubId } = params;
		Promise.all([Club.findById(clubId), Book.createByISBN(body)])
			.then(([club, book]) => {
				return Promise.all([User.findById(user.id), club.addBook(book)]).then(
					([user, [selection]]) => {
						return Vote.create({
							bookId: book.id,
							clubId: club.id,
							inFavor: true,
							selectionId: selection.id,
							userId: user.id,
						}).then((vote) => {
							return club.reload({
								include: [
									{ model: User },
									{
										model: Book,
										include: [{ model: Vote }],
									},
								],
							});
						});
					}
				);
			})
			.then(
				(club) => {
					res.json(club);
				},
				(err) => console.log(err)
			);
	});

	app.post(
		'/club/:clubId/book/:bookId/vote',
		({ user, body: { inFavor }, params: { clubId, bookId } }, res) => {
			Selection.findOne({
				where: {
					bookId,
					clubId,
				},
			}).then(
				({ clubId, bookId }) => {
					Vote.findOrCreate({
						where: {
							clubId,
							bookId,
							userId: user.id,
						},
						defaults: { inFavor },
					}).then(() => {
						return Club.findById(clubId, {
							include: [
								{ model: User },
								{
									model: Book,
									include: [{ model: Vote }],
								},
							],
						}).then((club) => res.json(club));
					});
				},
				(err) => console.log(err)
			);
		}
	);

	app.put('/club/:clubId/book/:bookId', adminClubUser, async (req, res) => {
		try {
			const { club } = req;
			const { bookId } = req.params;
			const { status } = req.body;
			const deactivation =
				status === 'active'
					? Selection.findAll({ where: { clubId: club.id, status } }).then((activeSelections) => {
							return Promise.all(
								activeSelections.map((selection) => selection.update({ status: 'archived' }))
							);
					  })
					: Promise.resolve(null);
			const [selection] = await Promise.all([
				Selection.findOne({ where: { bookId, clubId: club.id } }),
				deactivation,
			]);
			await selection.update({ status });
			const updatedClub = await club.reload();
			res.json(updatedClub);
		} catch (err) {
			errorHandler(res);
		}
	});
};
