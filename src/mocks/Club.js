// @flow

export default function() {
	return {
		id: 1,
		name: 'Book Club for Bears',
		adminIds: [1],
		memberIds: [1, 2, 3],
		members: [
			{
				firstName: 'Daniel',
				lastName: 'Sato',
				email: 'dksato@gmail.com',
				id: 1,
			},
			{
				firstName: 'Melanie',
				lastName: 'McCoy',
				email: 'foo@bar.com',
				id: 2,
			},
			{
				firstName: 'Kara',
				lastName: 'Thrace',
				email: 'kara@galactica.com',
				id: 2,
			},
		],
	};
}
