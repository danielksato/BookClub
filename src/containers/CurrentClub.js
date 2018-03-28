// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { ClubRecord } from 'reducers/ClubReducer';
import { PROPOSED, ACTIVE } from 'constants/AppConstants';
import Book from 'components/Book';
import { vote } from 'actions/BookActions';
import type { UserRecord } from 'reducers/UserReducer';
import type BookRecord from 'records/BookRecord';

const mapStateToProps = ({ club, user }) => ({ club, user });

const mapDispatchToProps = (dispatch) => ({ vote: (...args) => dispatch(vote(...args)) });

type Props = {
	club: ClubRecord,
	user: UserRecord,
	vote: (Object) => void,
};

export class CurrentClub extends PureComponent<Props> {
	static navString = 'Home';

	renderClubHeader() {
		return <h2>{this.props.club.name || 'You are not a member of any clubs'}</h2>;
	}

	renderCurrentBook() {
		const { books } = this.props.club;
		const currentBook = books.find(({ status }) => status === ACTIVE);
		if (!currentBook) {
			return <div>There is no book selected.</div>;
		}

		return (
			<div>
				<p>Current Book:</p>
				<Book book={currentBook} />
			</div>
		);
	}

	renderVoting = (book: BookRecord) => {
		const { user: { id }, club } = this.props;
		const onClick = (e): void => {
			const inFavor = !!e.target.getAttribute('data-for');
			this.props.vote({
				book,
				club,
				inFavor,
			});
		};

		if (book.voters.includes(id)) {
			return null;
		}

		return (
			<div className="w-25 p-1">
				<button className="ml-1" onClick={onClick} data-for="for">
					Vote For This Book
				</button>
				<button onClick={onClick}>Vote Against This Book</button>
			</div>
		);
	};

	renderProposedBooks() {
		const { club: { books } } = this.props;
		const proposedBooks = books.filter(({ status }) => {
			return status === PROPOSED;
		});

		const bookList = proposedBooks.map((book) => {
			return (
				<div key={book.isbn}>
					<Book book={book} />
					{this.renderVoting(book)}
				</div>
			);
		});

		return (
			<div>
				<p>Proposed Books:</p>
				{bookList}
			</div>
		);
	}

	renderMembers() {
		const memberList = this.props.club.users.map(({ id, firstName, lastName, role }) => {
			return (
				<p key={`member-${id}`} className={role}>
					{firstName} {lastName}
				</p>
			);
		});
		return (
			<div>
				<p>Members:</p>
				{memberList}
			</div>
		);
	}

	render() {
		return (
			<div>
				{this.renderClubHeader()}
				{this.renderCurrentBook()}
				{this.renderProposedBooks()}
				{this.renderMembers()}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentClub);
