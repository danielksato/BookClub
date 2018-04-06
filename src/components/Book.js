// @flow
import React, { PureComponent, type Node } from 'react';
import type BookRecord from 'records/BookRecord';
import { PROPOSED, ACTIVE } from 'constants/AppConstants';
import parseDate from 'util/ParseDate';
import styles from 'styles/Book.scss';

type Props = {
	book: BookRecord,
};

export default class Book extends PureComponent<Props> {
	renderThumb(): Node {
		const { book: { image, title } } = this.props;
		return <img alt={`cover for ${title}`} className="align-self-center" src={image} />;
	}

	renderVotes(): Node {
		const { votesFor, votesAgainst, status } = this.props.book;
		if (status === PROPOSED) {
			return (
				<div>
					<span>{votesFor} votes in favor, </span>
					<span>{votesAgainst} votes against</span>
				</div>
			);
		}
	}

	renderStatus(): Node {
		const { status, updatedAt } = this.props.book;
		if (status === ACTIVE) {
			return <span>Selected on {parseDate(updatedAt)}</span>;
		}
	}

	render(): Node {
		const { title, author, link, length } = this.props.book;
		return (
			<a href={link} rel="nofollow noopener" target="_blank" className={styles.link}>
				{this.renderThumb()}
				<div className={styles.text}>
					<span className={styles.title}>{title}</span>
					<span>{author}</span>
					<span>{length} pages</span>
					{this.renderVotes()}
					{this.renderStatus()}
				</div>
			</a>
		);
	}
}
