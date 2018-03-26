// @flow
import React, { PureComponent } from 'react';
import type { ClubRecord } from 'reducers/ClubReducer';
import { PROPOSED, ACTIVE } from 'constants/AppConstants';
import Book from './Book';

type Props = { club: ClubRecord };

export default class CurrentClub extends PureComponent<Props> {
	renderClubHeader() {
		return <div>{this.props.club.name}</div>;
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

	renderVoting() {
		const { books } = this.props.club;
		const proposedBooks = books.filter(({ status }) => {
			return status === PROPOSED;
		});

		const bookList = proposedBooks.map((book) => {
			return <Book key={book.isbn} book={book} />;
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
				{this.renderVoting()}
				{this.renderMembers()}
			</div>
		);
	}
}
