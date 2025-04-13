// const BASE_URL = 'http://213.219.214.83:8080';
const BASE_URL = 'http://localhost:8080/';

interface ApiResponse<T = any> {
	success: boolean;
	data?: T;
	message?: string;
}

// interface Birthday {
// 	year: number;
// 	month: number;
// 	day: number;
// }

export interface Profile {
	profileId: number;
	firstName: string;
	lastName: string;
	description: string;
	card: string;
	birthday: string;
	interests?: string[];
	avatar?: string;
}

async function sendRequest<T>(url: string, method: string, data: object | null = null): Promise<ApiResponse<T>> {
	try {
		const options: RequestInit = {
			method,
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		};

		if (data) {
			options.body = JSON.stringify(data);
		}

		const response = await fetch(url, options);

		if (response.ok) {
			const responseData = await response.json();
			return { success: true, data: responseData };
		}

		const errorText = await response.text();
		return { success: false, message: errorText };
	} catch (error) {
		return { success: false, message: error instanceof Error ? error.message : String(error) };
	}
}

// Функции API

async function loginUser(login: string, password: string): Promise<ApiResponse> {
	const url = `${BASE_URL}/users`;
	return sendRequest(url, 'POST', { login, password });
}

async function authUser(login: string, password: string): Promise<ApiResponse> {
	const url = `${BASE_URL}/users/login`;
	return sendRequest(url, 'POST', { login, password });
}

async function getProfiles(id: number): Promise<ApiResponse<Profile[]>> {
	const url = `${BASE_URL}/profiles?forUser=${id}`;
	return sendRequest(url, 'GET');
}

async function getProfile(userId: number): Promise<ApiResponse<Profile>> {
	const url = `${BASE_URL}/profiles/${userId}`;
	return sendRequest(url, 'GET');
}

async function logoutUser(): Promise<ApiResponse> {
	const url = `${BASE_URL}/users/logout`;
	return sendRequest(url, 'POST');
}

async function deleteUser(userId: number): Promise<ApiResponse> {
	const url = `${BASE_URL}/users/${userId}`;
	return sendRequest(url, 'DELETE');
}

async function checkSession(): Promise<ApiResponse> {
	const url = `${BASE_URL}/users/checkSession`;
	return sendRequest(url, 'GET');
}

//-----------------getMatches
async function getMatches(userId: number): Promise<ApiResponse<Profile[]>> {
	const url = `${BASE_URL}/profiles?forUser=${userId}`; //<---- ТУТ ИСПРАВИТЬ РУЧКУ
	return sendRequest(url, 'GET');
}
//-----------------

export default {
	BASE_URL,
	getProfiles,
	authUser,
	loginUser,
	getProfile,
	logoutUser,
	deleteUser,
	checkSession,
	getMatches,
};
