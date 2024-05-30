import { apiPost, apiPrimaryParam } from '$fetches/ApiFetcher';
import { executeLogout } from '$fetches/Logout';
import { deleteAllCookies, getUser } from '$helpers/CookiesUtil';
import { Endpoints } from '$helpers/Endpoints';
import { removeThousandsSeparator } from '$helpers/ThousandsSeparator';
import type { User } from '$types/User';
import { redirect, type Actions, type Cookies } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const user: User | null = getUser(cookies);
	if (!user) redirect(303, '/login');
};

export const actions: Actions = {
	logout: async ({ cookies }) => {
		const user: User | null = getUser(cookies);

		return await executeLogout(cookies);
	},
	clearCookies: async ({ cookies }) => {
		return deleteAllCookies(cookies);
	},
	transfer: async ({ cookies, request }) => {
		const data = await request.formData();

		const payload = await generatePayloadForTransfer(data);
		const transferRes = await saveForTransfer(cookies, payload);

		return { transferRes };
	}
};

const generatePayloadForTransfer = async (data: FormData) => {
	const transferData = data.get('transferData');
	const transferJson = JSON.parse(`${transferData}`);

	return {
		to_username: transferJson.username,
		amount: Number(removeThousandsSeparator(transferJson.amount))
	};
};

const saveForTransfer = async (cookies: Cookies, payload: object) => {
	const { accessToken } = apiPrimaryParam(cookies);

	return await apiPost(Endpoints.postTransfer, accessToken ?? '', payload);
};
