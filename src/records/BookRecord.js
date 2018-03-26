// @flow
import { Record } from 'immutable';
import { PROPOSED } from 'constants/AppConstants';

type ConstructorArgs = {
	selection: { status: string },
	[string]: number | string,
};

export default class BookRecord extends Record({
	author: '',
	id: 0,
	image: '',
	isbn: '',
	length: 0,
	link: '',
	thumbnail: '',
	title: '',
	status: PROPOSED,
}) {
	author: string;
	id: number;
	image: string;
	isbn: string;
	length: number;
	link: string;
	thumbnail: string;
	title: string;
	status: string;

	constructor({ selection, ...rest }: ConstructorArgs = {}) {
		super({
			...rest,
			status: selection ? selection.status : PROPOSED,
		});
	}
}
