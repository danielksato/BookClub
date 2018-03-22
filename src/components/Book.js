// @flow
import React, { PureComponent } from 'react';

type Props = $FlowFixMe;

export default class Book extends PureComponent<Props> {
	render() {
		const { title, author } = this.props.book;
		return (
			<div>
				<p>{title}</p>
				<p>{author}</p>
			</div>
		);
	}
}
