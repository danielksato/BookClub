// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { ClubRecord } from 'reducers/ClubReducer';
import { PROPOSED, ACTIVE } from 'constants/AppConstants';
import Book from 'components/Book';
import { vote } from 'actions/BookActions';

const mapStateToProps = ({ club }) => ({ club });

const mapDispatchToProps = (dispatch) => ({ vote: (...args) => dispatch(vote(...args)) });

type Props = {
	club: ClubRecord,
	vote: (Object) => void,
};

export class CurrentClub extends PureComponent<Props> {
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
		const { club, club: { books } } = this.props;
		const proposedBooks = books.filter(({ status }) => {
			return status === PROPOSED;
		});

		const bookList = proposedBooks.map((book) => {
			const onClick = (e): void => {
				const inFavor = !!e.target.getAttribute('data-for');
				this.props.vote({
					book,
					club,
					inFavor,
				});
			};

			return (
				<div key={book.isbn}>
					<Book book={book} />
					<button onClick={onClick} data-for="for">
						Vote For This Book
					</button>
					<button onClick={onClick}>Vote Against This Book</button>
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
				{this.renderVoting()}
				{this.renderMembers()}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentClub);
