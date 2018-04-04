// @flow

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

// Moment is huge; this is adequate.

export default function(dateString: string): string {
	const [year, monthNumString, dayNumString] = dateString.split(/-|T/);
	const [dayA, dayB] = dayNumString.split('0');
	const month = months[parseInt(monthNumString, 10) - 1];
	return `${dayA || dayB} ${month} ${year}`;
}
