// @flow
import type { ClubRecord } from 'reducers/ClubReducer';
import type { UserRecord } from 'reducers/UserReducer';

export default function({ user, club }: { user: UserRecord, club: ClubRecord }): ?string {
	const currentUser = club.users.find(({ id }) => id === user.id);
	return currentUser ? currentUser.role : null;
}
