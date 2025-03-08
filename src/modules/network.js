const BASE_URL = 'http://localhost:8080';

/**
 * Создание пользователя
 * @param {Object} userData - Данные пользователя (email, password)
 * @returns {Promise} - Промис с результатом запроса
 */
const createUser = async (userData) => {
	const url = `${BASE_URL}/users`;

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error creating user:', error);
		throw error;
	}
};

/**
 * Удаление пользователя
 * @param {number} userId - ID пользователя
 * @returns {Promise} - Промис с результатом запроса
 */
const deleteUser = async (userId) => {
	const url = `${BASE_URL}/users`;

	try {
		const response = await fetch(url, {
			method: 'DELETE',
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error deleting user:', error);
		throw error;
	}
};

/**
 * Вход пользователя в систему
 * @param {string} email - Email пользователя
 * @param {string} password - Пароль пользователя
 * @returns {Promise} - Промис с результатом запроса
 */
const loginUser = async (email, password) => {
	const url = new URL(`${BASE_URL}/users/login`);
	url.searchParams.append('email', email);
	url.searchParams.append('password', password);

	try {
		const response = await fetch(url, {
			method: 'POST',
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error logging in:', error);
		throw error;
	}
};

/**
 * Выход пользователя из системы
 * @param {number} rateLimit - Лимит запросов
 * @param {string} expiresAfter - Время истечения токена
 * @returns {Promise} - Промис с результатом запроса
 */
const logoutUser = async (rateLimit, expiresAfter) => {
	const url = `${BASE_URL}/users/logout`;

	try {
		const response = await fetch(url, {
			method: 'POST',
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error logging out:', error);
		throw error;
	}
};

/**
 * Получение профилей пользователя
 * @param {number} userId - ID пользователя
 * @returns {Promise} - Промис с результатом запроса
 */
const getProfiles = async (userId) => {
	const url = `${BASE_URL}/profiles/${userId}`;

	try {
		const response = await fetch(url, {
			method: 'GET',
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error fetching profiles:', error);
		throw error;
	}
};

export default {
	createUser,
	deleteUser,
	loginUser,
	logoutUser,
	getProfiles,
};