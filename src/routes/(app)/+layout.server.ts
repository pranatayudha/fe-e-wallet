import { deleteAllCookies, getUser } from '$helpers/CookiesUtil';
import type { User } from '$types/User';
import { redirect, type Cookies } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { apiGet, apiPrimaryParam } from '$fetches/ApiFetcher';
import { Endpoints } from '$helpers/Endpoints';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const user: User | null = getUser(cookies);
	if (!user) redirect(303, '/login');

	const balance: number = await fetchBalance(cookies);

	return {
		balance
	};
};

const fetchBalance = async (cookies: Cookies) => {
	const { accessToken } = apiPrimaryParam(cookies);

	const res = await apiGet(Endpoints.getBalance, accessToken ?? '');

	if (!res.success) {
		deleteAllCookies(cookies);
	}

	const balance: number = res.data.balance;

	return balance;
};
