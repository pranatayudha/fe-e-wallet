import { deleteAllCookies } from '$helpers/CookiesUtil';
import { Endpoints } from '$helpers/Endpoints';
import { httpResponseStatusCodes } from '$helpers/HttpResponseStatusCodes';
import type { Cookies } from '@sveltejs/kit';

export const executeLogout = async (cookies: Cookies) => {
	const accessToken = cookies.get('accesstoken');

	try {
		const res = await fetch(Endpoints.postUsersLogout, {
			method: 'POST',
			headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' }
		});

		const responseBody = await res.json();

		if (responseBody.statusCode !== httpResponseStatusCodes.ok) {
			if (responseBody.statusCode === httpResponseStatusCodes.unauthorized) {
				return { success: false, message: responseBody.message };
			}

			return { success: false, message: responseBody.message };
		}

		deleteAllCookies(cookies);

		return { success: true };
	} catch (err: unknown) {
		const message = `${err as string}`;

		return { success: false, message };
	}
};
