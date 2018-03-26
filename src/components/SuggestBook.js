// @flow
import React, { PureComponent, type Node } from 'react';
import { connect } from 'react-redux';
import { searchBook } from '../actions/BookActions';
import debounce from 'lodash.debounce';

import type BookRecord from '../records/BookRecord';
import type { List } from 'immutable';

const mapStateToProps = ({ app: { books } }) => ({ books });
const mapDispatchToProps = (dispatch: Function) => ({
	searchBook: (search: string) => dispatch(searchBook(search)),
});

type Props = {
	books: List<BookRecord>,
	searchBook: (string) => void,
};

type State = {
	search: string,
};

export class SuggestBook extends PureComponent<Props, State> {
	static navString = 'Suggest a book';
	state = { search: '' };

	constructor(): void {
		super();
		this.searchBook = debounce(this.searchBook, 1000);
	}

	searchBook = (search: string): void => {
		search && this.props.searchBook(search);
	};

	onChange = (e: SyntheticEvent<$FlowFixMe>): void => {
		// $FlowFixMe
		const { target: { value } } = e;
		this.setState({ search: value });
		this.searchBook(value);
	};

	renderResults(): Array<Node> {
		return this.props.books
			.map((book) => (
				<div key={`book-isbn-${book.isbn}`}>
					<a href={book.link} target="_blank">
						<img src={book.thumbnail} />
						<p>{book.title}</p>
						<p>{book.author}</p>
						<p>{book.length} pages</p>
					</a>
				</div>
			))
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
