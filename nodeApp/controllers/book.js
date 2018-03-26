const { Book, Club, User } = require('../models');

Book.createByISBN = function(newBook) {
	const { isbn } = newBook;
	Book.findOne({ where: { isbn } }).then((book) => {
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
				(err) => res.sendStatus(404)
			);
	});

	app.post('/club/:clubId/book', ({ user, body, params }, res) => {
		const { clubId } = params;
		Promise.all([Club.findById(clubId), Book.createByISBN(body)])
			.then(([club, book]) => {
				return Promise.all([
					User.findById(1).then((user) => user.addBook(book)),
					club
						.addBook(book)
						.then(() => club.reload({ include: [{ model: Book }, { model: User }] })),
				]);
			})
			.then(([user, club]) => {
				res.json(club);
			});
	});
};
