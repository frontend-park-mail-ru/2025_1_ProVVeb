const BASE_URL = 'http://213.219.214.83:8080';

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
	return result; // id
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

// export default getProfile;

export default {
	BASE_URL,
	getProfiles,
	authUser,
	loginUser,
	getProfile,
	logoutUser,
	deleteUser
};

// // Пример использования
// getProfiles('123'); // Здесь 123 - это id пользователя