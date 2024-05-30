import { BASE_URL } from '$env/static/private';

export class Endpoints {
	static postUsersLogin = `${BASE_URL}/login`;
	static postUsersRegister = `${BASE_URL}/register`;
	static postUsersLogout = `${BASE_URL}/logout`;
	static getBalance = `${BASE_URL}/balance`;
	static getTransactionHistory = `${BASE_URL}/transaction-history`;
	static postTransfer = `${BASE_URL}/transfer`;
	static postTopUp = `${BASE_URL}/topup`;
}
