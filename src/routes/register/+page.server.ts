import { getUser } from '$helpers/CookiesUtil';
import { Endpoints } from '$helpers/Endpoints';
import { httpResponseStatusCodes } from '$helpers/HttpResponseStatusCodes';
import type { User } from '$types/User';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const user: User | null = getUser(cookies);
	if (user) redirect(303, '/');
};

export const actions: Actions = {
	register: async ({ request }) => {
		const data = await request.formData();
		const payload = { username: data.get('username') ?? '' };

		return executeRegister(payload);
	}
};

const executeRegister = async (payload: any) => {
	try {
		const res = await fetch(Endpoints.postUsersRegister, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		});

		const responseBody = await res.json();

		if (responseBody.statusCode !== httpResponseStatusCodes.created) {
			return { success: false, message: responseBody.message };
		}

		return {
			success: true,
			data: responseBody.data,
			message: responseBody.message
		};
	} catch (err: unknown) {
		const message = `${err as string}`;

		return { success: false, message };
	}
};
