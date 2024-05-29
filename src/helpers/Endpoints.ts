import { BASE_URL } from '$env/static/private';

export class Endpoints {
	static postUsersLogin = `${BASE_URL}/login`;
	static postUsersLogout = `${BASE_URL}/logout`;
}
