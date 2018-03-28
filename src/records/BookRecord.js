// @flow
import { Record } from 'immutable';
import { PROPOSED } from 'constants/AppConstants';
import type { BookResponse } from 'apis/BookApi';

export default class BookRecord extends Record({
	author: '',
	id: 0,
	image: '',
	isbn: '',
	length: 0,
	link: '',
	status: PROPOSED,
	thumbnail: '',
	title: '',
	votesAgainst: 0,
	votesFor: 0,
}) {
	author: string;
	id: number;
	image: string;
	isbn: string;
	length: number;
	link: string;
	status: string;
	thumbnail: string;
	title: string;
	votesAgainst: 0;
	votesFor: 0;

	constructor({ selection, votes, ...rest }: BookResponse = {}) {
		super({
			...rest,
			status: selection ? selection.status : PROPOSED,
			votesAgainst: votes ? votes.filter(({ inFavor }) => !inFavor).length : 0,
			votesFor: votes ? votes.filter(({ inFavor }) => inFavor).length : 0,
		});
	}
}
