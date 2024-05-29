import type { Cookies } from '@sveltejs/kit';
import type { User } from '../types/User';

export const getUser = (cookies: Cookies): User | null => {
	const userCookie = cookies.get('user');

	if (userCookie) {
		return JSON.parse(userCookie) as User;
	}

	return null;
};

export const deleteAllCookies = (cookies: Cookies) => {
	cookies.set('user', '', { httpOnly: true, path: '/', maxAge: 0 });
	cookies.set('accesstoken', '', { httpOnly: true, path: '/', maxAge: 0 });
};
