const BASE_URL = 'http://213.219.214.83:8080';

async function sendRequest(url, method, data = null) {
	try {
		const options = {
			method: method,
			// credentials: 'include',
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
	const url = `${BASE_URL}/users${userId}`;

	const result = await sendRequest(url, 'DELETE');
	return result;
}

// export default getProfile;

export default {
	getProfiles,
	authUser,
	loginUser,
	getProfile,
	logoutUser,
	deleteUser
};

// // Пример использования
// getProfiles('123'); // Здесь 123 - это id пользователя

// /**
//  * Создание пользователя
//  * @param {Object} userData - Данные пользователя (email, password)
//  * @returns {Promise} - Промис с результатом запроса
//  */
// const createUser = async (userData) => {
// 	const url = `${BASE_URL}/users`;

// 	try {
// 		const response = await fetch(url, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify(userData),
// 		});

// 		if (!response.ok) {
// 			throw new Error(`HTTP error! status: ${response.status}`);
// 		}

// 		return await response.json();
// 	} catch (error) {
// 		console.error('Error creating user:', error);
// 		throw error;
// 	}
// };

// /**
//  * Удаление пользователя
//  * @param {number} userId - ID пользователя
//  * @returns {Promise} - Промис с результатом запроса
//  */
// const deleteUser = async (userId) => {
// 	const url = `${BASE_URL}/users`;

// 	try {
// 		const response = await fetch(url, {
// 			method: 'DELETE',
// 		});

// 		if (!response.ok) {
// 			throw new Error(`HTTP error! status: ${response.status}`);
// 		}

// 		return await response.json();
// 	} catch (error) {
// 		console.error('Error deleting user:', error);
// 		throw error;
// 	}
// };

// /**
//  * Вход пользователя в систему
//  * @param {string} email - Email пользователя
//  * @param {string} password - Пароль пользователя
//  * @returns {Promise} - Промис с результатом запроса
//  */
// const loginUser = async (email, password) => {
// 	const url = new URL(`${BASE_URL}/users/login`);
// 	url.searchParams.append('email', email);
// 	url.searchParams.append('password', password);

// 	try {
// 		const response = await fetch(url, {
// 			method: 'POST',
// 		});

// 		if (!response.ok) {
// 			throw new Error(`HTTP error! status: ${response.status}`);
// 		}

// 		return await response.json();
// 	} catch (error) {
// 		console.error('Error logging in:', error);
// 		throw error;
// 	}
// };

// /**
//  * Выход пользователя из системы
//  * @param {number} rateLimit - Лимит запросов
//  * @param {string} expiresAfter - Время истечения токена
//  * @returns {Promise} - Промис с результатом запроса
//  */
// const logoutUser = async (rateLimit, expiresAfter) => {
// 	const url = `${BASE_URL}/users/logout`;

// 	try {
// 		const response = await fetch(url, {
// 			method: 'POST',
// 		});

// 		if (!response.ok) {
// 			throw new Error(`HTTP error! status: ${response.status}`);
// 		}

// 		return await response.json();
// 	} catch (error) {
// 		console.error('Error logging out:', error);
// 		throw error;
// 	}
// };

// /**
//  * Получение профилей пользователя
//  * @param {number} userId - ID пользователя
//  * @returns {Promise} - Промис с результатом запроса
//  */
// const getProfiles = async (userId) => {
// 	const url = `${BASE_URL}/profiles/${userId}`;

// 	try {
// 		const response = await fetch(url, {
// 			method: 'GET',
// 		});

// 		if (!response.ok) {
// 			throw new Error(`HTTP error! status: ${response.status}`);
// 		}

// 		return await response.json();
// 	} catch (error) {
// 		console.error('Error fetching profiles:', error);
// 		throw error;
// 	}
// };

// export default {
// 	createUser,
// 	deleteUser,
// 	loginUser,
// 	logoutUser,
// 	getProfiles,
// };
