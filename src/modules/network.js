const BASE_URL = 'http://213.219.214.83:8080';
// const LOCATION = window.location.href;
// const BASE_URL = LOCATION.endsWith('/') ? LOCATION.slice(0, -1) : LOCATION;

async function sendRequest(url, method, data = null) {
	try {
		const options = {
			method: method,
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
		return { success: false, message: error.message };
	}
}

async function loginUser(login, password) {
	const url = `${BASE_URL}/users`;
	const data = { login, password };

	const result = await sendRequest(url, 'POST', data);
	return result;
}

async function authUser(login, password) {
	const url = `${BASE_URL}/users/login`;
	const data = { login, password };

	const result = await sendRequest(url, 'POST', data);
	return result;
}

async function getProfiles(id) {
	const url = `${BASE_URL}/profiles?forUser=${id}`;

	const result = await sendRequest(url, 'GET');
	return result;
}

async function getProfile(userId) {
	const url = `${BASE_URL}/profiles/${userId}`;

	const result = await sendRequest(url, 'GET');
	return result;
}

async function logoutUser() {
	const url = `${BASE_URL}/users/logout`;

	const result = await sendRequest(url, 'POST');
	return result;
}

async function deleteUser(userId) {
	const url = `${BASE_URL}/users/${userId}`;

	const result = await sendRequest(url, 'DELETE');
	return result;
}

async function checkSession() {
	const url = `${BASE_URL}/users/checkSession`

	const result = await sendRequest(url, 'GET');
	return result;
}

export default {
	BASE_URL,
	getProfiles,
	authUser,
	loginUser,
	getProfile,
	logoutUser,
	deleteUser,
	checkSession,
};