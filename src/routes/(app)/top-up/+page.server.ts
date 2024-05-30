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
	topUp: async ({ cookies, request }) => {
		const data = await request.formData();

		const payload = await generatePayloadForTopUp(data);
		const topUpRes = await saveForTopUp(cookies, payload);

		return { topUpRes };
	}
};

const generatePayloadForTopUp = async (data: FormData) => {
	const topUpData = data.get('topUpData');
	const topUpJson = JSON.parse(`${topUpData}`);

	return {
		amount: Number(removeThousandsSeparator(topUpJson.amount))
	};
};

const saveForTopUp = async (cookies: Cookies, payload: object) => {
	const { accessToken } = apiPrimaryParam(cookies);

	return await apiPost(Endpoints.postTopUp, accessToken ?? '', payload);
};
