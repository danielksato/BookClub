// @flow
import { Record } from 'immutable';
import { PROPOSED } from '../constants/AppConstants';

type ConstructorArgs = {
	selection: { status: string },
	[string]: number | string,
};

export default class BookRecord extends Record({
	id: 0,
	title: '',
	author: '',
	isbn: '',
	status: PROPOSED,
}) {
	id: number;
	title: string;
	author: string;
	isbn: string;
	status: string;

	constructor({ selection, ...rest }: ConstructorArgs = {}) {
		super({
			...rest,
			status: selection ? selection.status : PROPOSED,
		});
	}
}
