import { getUser } from '$helpers/CookiesUtil';
import type { User } from '$types/User';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ cookies }) => {
	const user: User | null = getUser(cookies);

	return { user };
};
