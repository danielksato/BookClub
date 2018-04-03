// @flow
export function loadClubMock() {
	return {
		id: 1,
		name: 'Bear Club',
		createdAt: '2018-04-02T15:32:38.300Z',
		updatedAt: '2018-04-02T15:32:38.300Z',
		users: [
			{
				id: 1,
				firstName: 'Daniel',
				lastName: 'Sato',
				email: 'dksato@gmail.com',
				googleId: '114424838772956984190',
				createdAt: '2018-04-02T15:32:38.299Z',
				updatedAt: '2018-04-02T15:32:38.299Z',
				membership: { role: 'active' },
			},
			{
				id: 14,
				firstName: null,
				lastName: null,
				email: 'dksato+14@gmail.com',
				googleId: null,
				createdAt: '2018-04-02T16:30:40.662Z',
				updatedAt: '2018-04-02T16:30:40.662Z',
				membership: { role: 'invited' },
			},
			{
				id: 11,
				firstName: 'Amy',
				lastName: 'Lee',
				email: 'dksato+10@gmail.com',
				googleId: null,
				createdAt: '2018-04-02T15:54:32.874Z',
				updatedAt: '2018-04-02T15:54:32.874Z',
				membership: { role: 'invited' },
			},
			{
				id: 9,
				firstName: 'Tommy',
				lastName: 'Karevik',
				email: 'dksato+08@gmail.com',
				googleId: null,
				createdAt: '2018-04-02T15:51:33.712Z',
				updatedAt: '2018-04-02T15:51:33.712Z',
				membership: { role: 'invited' },
			},
			{
				id: 8,
				firstName: 'Kara',
				lastName: 'Thrace',
				email: 'dksato+07@gmail.com',
				googleId: null,
				createdAt: '2018-04-02T15:49:44.486Z',
				updatedAt: '2018-04-02T15:49:44.486Z',
				membership: { role: 'active' },
			},
		],
		books: [
			{
				id: 1,
				author: 'Dale Carnegie',
				image: 'https://images-na.ssl-images-amazon.com/images/I/51X7dEUFgoL._SL160_.jpg',
				isbn: '0671027034',
				length: 288,
				link:
					'https://www.amazon.com/How-Win-Friends-Influence-People/dp/0671027034?SubscriptionId=AKIAIAPAAKMZGKI4FAJQ&tag=danielksato-20&linkCode=xm2&camp=2025&creative=165953&creativeASIN=0671027034',
				thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/51X7dEUFgoL._SL75_.jpg',
				title: 'How to Win Friends & Influence People',
				createdAt: '2018-04-02T16:50:13.995Z',
				updatedAt: '2018-04-02T16:50:13.995Z',
				selection: {
					status: 'proposed',
					createdAt: '2018-04-02T16:50:14.025Z',
					updatedAt: '2018-04-02T16:50:14.025Z',
					clubId: 1,
					bookId: 1,
				},
				votes: [
					{
						id: 1,
						inFavor: true,
						createdAt: '2018-04-02T16:50:14.038Z',
						updatedAt: '2018-04-02T16:50:14.038Z',
						clubId: 1,
						bookId: 1,
						userId: 1,
					},
				],
			},
		],
	};
}

export function createClubMock() {
	return {
		id: 5,
		name: 'Anteater Club',
		createdAt: '2018-04-03T21:43:42.480Z',
		updatedAt: '2018-04-03T21:43:42.480Z',
		users: [
			{
				id: 1,
				firstName: 'Daniel',
				lastName: 'Sato',
				email: 'dksato@gmail.com',
				googleId: '114424838772956984190',
				createdAt: '2018-04-02T15:32:38.299Z',
				updatedAt: '2018-04-02T15:32:38.299Z',
				membership: { role: 'admin' },
			},
		],
		books: [],
	};
}

export function inviteMemberMock() {
	return {
		club: {
			id: 5,
			name: 'Anteater Club',
			createdAt: '2018-04-03T21:43:42.480Z',
			updatedAt: '2018-04-03T21:43:42.480Z',
			users: [
				{
					id: 1,
					firstName: 'Daniel',
					lastName: 'Sato',
					email: 'dksato@gmail.com',
					googleId: '114424838772956984190',
					createdAt: '2018-04-02T15:32:38.299Z',
					updatedAt: '2018-04-02T15:32:38.299Z',
					membership: {
						role: 'admin',
						createdAt: '2018-04-03T21:43:42.506Z',
						updatedAt: '2018-04-03T21:43:42.506Z',
						userId: 1,
						clubId: 5,
					},
				},
				{
					id: 15,
					firstName: null,
					lastName: null,
					email: 'hal.jordan@glc.com',
					googleId: null,
					createdAt: '2018-04-03T21:55:20.652Z',
					updatedAt: '2018-04-03T21:55:20.652Z',
					membership: {
						role: 'invited',
						createdAt: '2018-04-03T21:55:20.704Z',
						updatedAt: '2018-04-03T21:55:20.704Z',
						userId: 15,
						clubId: 5,
					},
				},
			],
			books: [],
		},
		invitation: {
			id: 8,
			uuid: 'b41eba40-3789-11e8-ba20-b7dbd0ba2c87',
			updatedAt: '2018-04-03T21:55:20.677Z',
			createdAt: '2018-04-03T21:55:20.677Z',
		},
	};
}
