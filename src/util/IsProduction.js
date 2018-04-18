// @flow
export default function(): boolean {
	return process.env.NODE_ENV === 'production';
}
