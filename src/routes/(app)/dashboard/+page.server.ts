import { apiGet, apiPrimaryParam } from '$fetches/ApiFetcher';
import { executeLogout } from '$fetches/Logout';
import { deleteAllCookies, getUser } from '$helpers/CookiesUtil';
import { Endpoints } from '$helpers/Endpoints';
import type { User } from '$types/User';
import type { TransactionHistory } from '$types/Wallet';
import { redirect, type Actions, type Cookies } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const user: User | null = getUser(cookies);
	if (!user) redirect(303, '/login');

	const transactionHistory: TransactionHistory[] = await fetchTransactionHistory(cookies);

	return {
		transactionHistory
	};
};

export const actions: Actions = {
	logout: async ({ cookies }) => {
		const user: User | null = getUser(cookies);

		return await executeLogout(cookies);
	},
	clearCookies: async ({ cookies }) => {
		return deleteAllCookies(cookies);
	}
};

const fetchTransactionHistory = async (cookies: Cookies) => {
	const { accessToken } = apiPrimaryParam(cookies);

	const res = await apiGet(Endpoints.getTransactionHistory, accessToken ?? '');

	if (!res.success) {
		deleteAllCookies(cookies);
	}

	const transactionHistory: TransactionHistory[] = res.data;

	return transactionHistory;
};
