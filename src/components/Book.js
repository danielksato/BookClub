// @flow
import React, { PureComponent, type Node } from 'react';
import type BookRecord from 'records/BookRecord';
import styles from 'styles/Book.module.css';
import classnames from 'classnames';

type Props = {
	book: BookRecord,
	large?: boolean,
};

export default class Book extends PureComponent<Props> {
	renderThumb(): Node {
		const { book: { thumbnail, image, title }, large } = this.props;
		return (
			<img
				alt={`cover image for ${title}`}
				className="align-self-center"
				src={large ? image : thumbnail}
			/>
		);
	}

	render(): Node {
		const { title, author, link, length, votesFor, votesAgainst } = this.props.book;
		return (
			<a
				href={link}
				target="_blank"
				className={classnames('media p-1 w-25 border rounded bg-secondary', styles.link)}
			>
				{this.renderThumb()}
				<div className={classnames('media-body p-1 font-size-small', styles.text)}>
					<span>{title}</span>
					<span>{author}</span>
					<span>{length} pages</span>
					<span>{votesFor} votes in favor</span>
					<span>{votesAgainst} votes against</span>
				</div>
			</a>
		);
	}
}
