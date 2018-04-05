// @flow
import React, { PureComponent, type Node } from 'react';
import { connect } from 'react-redux';
import { searchBook, suggestBook } from 'actions/BookActions';
import debounce from 'lodash.debounce';
import Book from 'components/Book';

import type BookRecord from 'records/BookRecord';
import type { List } from 'immutable';
import type { ClubRecord } from 'reducers/ClubReducer';

const mapStateToProps = ({ app: { books }, club }) => ({ books, club });
const mapDispatchToProps = (dispatch: Function) => ({
	searchBook: (search: string) => dispatch(searchBook(search)),
	suggestBook: ({ book, club }) => dispatch(suggestBook({ book, club })),
});

type Props = {
	books: List<BookRecord>,
	club: ClubRecord,
	searchBook: (search: string) => void,
	suggestBook: ({ book: BookRecord, club: ClubRecord }) => void,
};

type State = {
	search: string,
};

export class SuggestBook extends PureComponent<Props, State> {
	static navString = 'Suggest a book';
	static urlParam = '/suggest';

	state = { search: '' };

	constructor(): void {
		super();
		this.searchBook = (debounce(this.searchBook, 1000): (string) => void);
	}

	suggestBook = (book: BookRecord) => {
		const { club } = this.props;
		this.props.suggestBook({ club, book });
	};

	searchBook = (search: string): void => {
		search && this.props.searchBook(search);
	};

	onChange = (e: SyntheticEvent<HTMLInputElement>): void => {
		const { currentTarget: { value } } = e;
		this.setState({ search: value });
		this.searchBook(value);
	};

	renderResults(): Array<Node> {
		return this.props.books
			.map((book) => {
				const onClick = () => this.suggestBook(book);
				return (
					<div key={`book-isbn-${book.isbn}`}>
						<Book {...{ book }} />
						<button onClick={onClick}>Suggest This Book</button>
					</div>
				);
			})
			.toArray();
	}

	renderSearch(): Node {
		return (
			<div>
				<input id="bookSearch" value={this.state.search} onChange={this.onChange} />
				<label htmlFor="bookSearch">Search by Title or Author</label>
			</div>
		);
	}
	render(): Node {
		return (
			<div>
				Pick books
				{this.renderSearch()}
				{this.renderResults()}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestBook);
