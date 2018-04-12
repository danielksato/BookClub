// @flow

function capitalize(string: string): string {
	return string ? string[0].toUpperCase() + string.slice(1) : string;
}

export default function(string: string): string {
	return string
		.replace(/([A-Z])/g, ' $1')
		.split(' ')
		.map(capitalize)
		.join(' ');
}
