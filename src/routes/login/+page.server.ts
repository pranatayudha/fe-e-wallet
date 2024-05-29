import { getUser } from '$helpers/CookiesUtil';
import { Endpoints } from '$helpers/Endpoints';
import { httpResponseStatusCodes } from '$helpers/HttpResponseStatusCodes';
import type { User } from '$types/User';
import { redirect, type Cookies } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const user: User | null = getUser(cookies);
	if (user) redirect(303, '/');
};

export const actions: Actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const payload = { username: data.get('username') ?? '' };

		return executeLogin(payload, cookies);
	}
};

const executeLogin = async (payload: any, cookies: Cookies) => {
	try {
		const res = await fetch(Endpoints.postUsersLogin, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		});

		const responseBody = await res.json();

		if (responseBody.statusCode !== httpResponseStatusCodes.ok) {
			return { success: false, message: responseBody.message };
		}

		cookies.set('user', JSON.stringify(payload), { httpOnly: true, path: '/' });
		cookies.set('accesstoken', responseBody.data.token, { httpOnly: true, path: '/' });
	} catch (err: unknown) {
		const message = `${err as string}`;

		return { success: false, message };
	}
};
