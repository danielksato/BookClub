// @flow
import React, { PureComponent, type Node } from 'react';
import { connect } from 'react-redux';
import { searchBook, suggestBook } from 'actions/BookActions';
import debounce from 'lodash.debounce';
import Book from 'components/Book';
import preventDefault from 'util/PreventDefault';

import type BookRecord from 'records/BookRecord';
import type { List } from 'immutable';
import type { ClubRecord } from 'reducers/ClubReducer';

import styles from 'styles/SuggestBook.scss';

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

	renderResultHeading(): Node {
		const { books: { size } } = this.props;
		return size ? <h2>Results</h2> : null;
	}

	renderResults(): Array<Node> {
		return this.props.books
			.map((book) => {
				const onClick = () => this.suggestBook(book);
				return (
					<div key={`book-isbn-${book.isbn}`} className={styles.searchResult}>
						<Book {...{ book }} />
						<button onClick={onClick}>Suggest This Book</button>
					</div>
				);
			})
			.toArray();
	}

	renderSearch(): Node {
		return (
			<form className={styles.searchForm} onSubmit={preventDefault}>
				<input
					className="form-control"
					id="bookSearch"
					value={this.state.search}
					onChange={this.onChange}
				/>
				<label htmlFor="bookSearch">Search by Title or Author</label>
			</form>
		);
	}
	render(): Node {
		return (
			<div className={styles.container}>
				<h2>Suggest a book</h2>
				{this.renderSearch()}
				{this.renderResultHeading()}
				{this.renderResults()}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestBook);
