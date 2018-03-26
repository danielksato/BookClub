// @flow
import React, { PureComponent, type Node } from 'react';
import type BookRecord from 'records/BookRecord';

type Props = {
	book: BookRecord,
	large?: boolean,
};

export default class Book extends PureComponent<Props> {
	renderThumb(): Node {
		const { book: { thumbnail, image }, large } = this.props;
		return <img src={large ? image : thumbnail} />;
	}

	render(): Node {
		const { title, author, link, length } = this.props.book;
		return (
			<a href={link} target="_blank">
				{this.renderThumb()}
				<p>{title}</p>
				<p>{author}</p>
				<p>{length} pages</p>
			</a>
		);
	}
}
