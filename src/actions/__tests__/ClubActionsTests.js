// @flow
import * as ClubActions from 'actions/ClubActions';
import * as ClubApi from 'apis/ClubApi';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from 'reducers';
import { loadClubMock, createClubMock, inviteMemberMock } from 'ClubMocks';
import { INITIAL, IN_PROGRESS, DONE, ERROR } from 'constants/StatusConstants';
import { ClubRecord } from 'reducers/ClubReducer';

jest.mock('apis/ClubApi');

const createDispatch = (store) => (action: Action<any> | ThunkAction) => {
	return new Promise((resolve) => {
		store.dispatch(action);
		process.nextTick(() => {
			resolve(store.getState());
		});
	});
};

describe('ClubActions', () => {
	const userId = 1;
	const clubId = 1;
	let store;
	let dispatch;

	beforeEach(() => {
		store = createStore(rootReducer, applyMiddleware(thunk));
		dispatch = createDispatch(store);
	});

	function getClubState() {
		return store.getState().club;
	}

	describe('loadClub', () => {
		it('should fetch club data', (done) => {
			const mockData = loadClubMock();
			ClubApi.getClub.mockImplementation(() => Promise.resolve(mockData));
			expect(getClubState().status).toBe(INITIAL);
			dispatch(ClubActions.loadClub(clubId)).then(({ club }) => {
				expect(club.status).toBe(DONE);
				expect(club.name).toBe(mockData.name);
				done();
			});
			expect(getClubState().status).toBe(IN_PROGRESS);
		});

		it('should handle failure', async (done) => {
			ClubApi.getClub.mockImplementation(() => Promise.reject(new Error()));
			expect(getClubState().status).toBe(INITIAL);
			const { club } = await dispatch(ClubActions.loadClub(clubId));
			expect(club.status).toBe(ERROR);
			done();
		});
	});

	describe('createClub', () => {
		const name = 'Anteater Club';
		const newClub = new ClubRecord({ name });

		it('should create a club', () => {
			const mockData = createClubMock();
			ClubApi.createClub.mockImplementation(() => Promise.resolve(mockData));
			const { user, club } = store.getState();
			expect(club.name).not.toBe(name);
			expect(user.clubs.size).toBe(0);
			return dispatch(ClubActions.createClub(newClub)).then(({ club, user }) => {
				expect(club.name).toBe(name);
				expect(user.clubs.size).toBe(1);
			});
		});

		it('should handle failure', () => {
			ClubApi.createClub.mockImplementation(() => Promise.reject(new Error()));
			const { user, club } = store.getState();
			expect(club.name).not.toBe(name);
			expect(user.clubs.size).toBe(0);
			return dispatch(ClubActions.createClub);
			// We aren't actually doing anything with the failure action yet
		});
	});

	describe('inviteMember', () => {
		const email = 'hal.jordan@glc.com';
		const mockData = inviteMemberMock();

		beforeEach(() => {
			store = createStore(
				rootReducer,
				{ club: new ClubRecord(createClubMock()) },
				applyMiddleware(thunk)
			);
			dispatch = createDispatch(store);
		});

		it('should invite a member', async (done) => {
			ClubApi.inviteMember.mockImplementation(() => Promise.resolve(mockData));
			let { club } = await dispatch(
				ClubActions.inviteMember({ clubId: store.getState().club.id, email })
			);
			expect(club.users.size).toBe(2);
			expect(club.users.find((user) => user.email === email)).toBeTruthy();
			done();
		});
	});
});
