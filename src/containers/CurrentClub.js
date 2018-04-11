// @flow
import React, { PureComponent, type Node } from 'react';
import { connect } from 'react-redux';
import type { ClubRecord } from 'reducers/ClubReducer';
import { PROPOSED, ACTIVE, ADMIN, ARCHIVED } from 'constants/AppConstants';
import Book from 'components/Book';
import { vote, modifyBook } from 'actions/BookActions';
import { inviteMember } from 'actions/ClubActions';
import type { UserRecord } from 'reducers/UserReducer';
import type BookRecord from 'records/BookRecord';
import Inviter from 'components/Inviter';
import getCurrentRole from 'util/GetCurrentRole';
import { replace } from 'react-router-redux';
import styles from 'styles/CurrentClub.scss';
import { Link } from 'react-router-dom';
import Member from 'components/Member';
import { CURRENT_CLUB, MY_CLUBS } from 'constants/RouteConstants';

const mapStateToProps = ({ club, user }) => ({ club, user });

const mapDispatchToProps = {
	vote,
	inviteMember,
	modifyBook,
	replace,
};

type Props = {
	club: ClubRecord,
	user: UserRecord,
	vote: (Object) => void,
	inviteMember: ({ clubId: number, email: string }) => void,
	modifyBook: (Object) => void,
	replace: (string) => void,
};

export class CurrentClub extends PureComponent<Props> {
	static navString = 'Home';
	static urlParam = CURRENT_CLUB;

	get currentRole(): ?string {
		const { club, user } = this.props;
		return getCurrentRole({ club, user });
	}

	componentDidMount() {
		const { club: { id }, replace } = this.props;
		if (id) {
			replace(`/clubinfo/${id}`);
		}
	}

	componentDidUpdate(prevProps: Props) {
		const { club: { id }, replace } = this.props;
		if (id !== prevProps.club.id) {
			replace(`/clubinfo/${id}`);
		}
	}

	renderClubHeader() {
		return <h2>{this.props.club.name || 'No club selected'}</h2>;
	}

	renderArchive(book: BookRecord): Node {
		const { club: { id }, modifyBook } = this.props;
		if (this.currentRole !== ADMIN) {
			return null;
		}
		const onClick = () => modifyBook({ status: ARCHIVED, bookId: book.id, clubId: id });
		return <button onClick={onClick}>Archive this book</button>;
	}

	renderCurrentBook() {
		const { books } = this.props.club;
		const currentBook = books.find(({ status }) => status === ACTIVE);
		if (!currentBook) {
			return <div>There is no book selected.</div>;
		}

		return (
			<div className={styles.activeBook}>
				<p>Current Book:</p>
				<Book book={currentBook} />
				{this.renderArchive(currentBook)}
			</div>
		);
	}

	renderVoting(book: BookRecord) {
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
			<div className={styles.voting}>
				<button onClick={onClick} data-for="for">
					Vote For This Book
				</button>
				<button onClick={onClick}>Vote Against This Book</button>
			</div>
		);
	}

	renderAutocraticSelect(book: BookRecord): Node {
		const { club: { id }, modifyBook } = this.props;
		if (this.currentRole !== ADMIN) {
			return null;
		}
		const onClick = () => modifyBook({ status: ACTIVE, bookId: book.id, clubId: id });
		return <button onClick={onClick}>Select this book</button>;
	}

	renderProposedBooks(): Node {
		const { club: { books } } = this.props;
		const proposedBooks = books.filter(({ status }) => {
			return status === PROPOSED;
		});

		const bookList = proposedBooks.map((book) => {
			return (
				<div key={book.isbn} className={styles.book}>
					<Book book={book} />
					{this.renderVoting(book)}
					{this.renderAutocraticSelect(book)}
				</div>
			);
		});

		if (!bookList.size) {
			return (
				<Link className={styles.suggestLink} to="/suggest">
					Suggest a few books for your friends
				</Link>
			);
		}

		return (
			<div className={styles.list}>
				<p>Proposed Books:</p>
				{bookList}
			</div>
		);
	}

	renderInvite(): Node {
		return <Inviter club={this.props.club} inviteMember={this.props.inviteMember} />;
	}

	renderMembers(): Node {
		const memberList = this.props.club.users.map((user) => {
			return <Member key={`member-${user.id}`} user={user} />;
		});

		return (
			<div className={styles.list}>
				<p>Members:</p>
				{memberList}
				{this.renderInvite()}
			</div>
		);
	}

	render(): Node {
		const { club: { id } } = this.props;
		return (
			<div className={styles.container}>
				{this.renderClubHeader()}
				{id ? this.renderCurrentBook() : null}
				{id ? this.renderProposedBooks() : null}
				{id ? this.renderMembers() : null}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentClub);
