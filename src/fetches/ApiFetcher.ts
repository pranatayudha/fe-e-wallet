import { getUser } from '$helpers/CookiesUtil';
import { setValue } from '$helpers/DefaultValue';
import { httpResponseStatusCodes } from '$helpers/HttpResponseStatusCodes';
import type { User } from '$types/User';
import type { Cookies } from '@sveltejs/kit';

export const apiPrimaryParam = (cookies: Cookies) => {
	const user: User | null = getUser(cookies);
	const accessToken = cookies.get('accesstoken');

	return { user, accessToken };
};

export const apiGet = async (url: string, token: string) => {
	return await apiQueryParam(url, 'GET', token, '');
};

export const apiPost = async (url: string, token: string, payload: object) => {
	return await apiPayloadJson(url, 'POST', token, payload);
};

export const apiQueryParam = async (
	url: string,
	method: string,
	token: string,
	queryParam: any
) => {
	try {
		const params = setValue(queryParam, '');
		const geyQueryParam =
			params != ''
				? Object.keys(queryParam)
						.map((key) => `${key}=${queryParam[key]}`)
						.join('&')
				: '';
		const queryParameter = geyQueryParam != '' ? `?${geyQueryParam}` : '';

		const res = await fetch(url + queryParameter, {
			method: method,
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		const responseBody = await res.json();

		if (responseBody.statusCode !== httpResponseStatusCodes.ok) {
			return { success: false, message: responseBody.message };
		}

		return {
			success: true,
			data: responseBody.data,
			message: responseBody.message
		};
	} catch (error: unknown) {
		const message = `${error as string}`;

		return { success: false, message };
	}
};

export const apiPayloadJson = async (
	url: string,
	method: string,
	token: string,
	payload: object
) => {
	try {
		const res = await fetch(url, {
			method: method,
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		});

		const responseBody = await res.json();

		if (responseBody.statusCode !== httpResponseStatusCodes.ok) {
			return { success: false, message: responseBody.message };
		}

		return {
			success: true,
			data: responseBody.data,
			message: responseBody.message
		};
	} catch (error: unknown) {
		const message = `${error as string}`;

		return { success: false, message };
	}
};
