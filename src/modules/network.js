/**
 * Базовый URL API
 * @constant {string}
 */
const BASE_URL = 'http://213.219.214.83:8080';

/**
 * Отправляет HTTP-запрос на указанный URL
 * @async
 * @param {string} url - URL запроса
 * @param {string} method - HTTP-метод (GET, POST, DELETE и т. д.)
 * @param {Object} [data=null] - Тело запроса (если требуется)
 * @returns {Promise<Object>} Объект с результатом запроса { success: boolean, data?: any, message?: string }
 */
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

/**
 * Регистрирует нового пользователя
 * @async
 * @param {string} login - Логин пользователя
 * @param {string} password - Пароль пользователя
 * @returns {Promise<Object>} Результат запроса
 */
async function loginUser(login, password) {
	const url = `${BASE_URL}/users`;
	return await sendRequest(url, 'POST', { login, password });
}

/**
 * Авторизует пользователя
 * @async
 * @param {string} login - Логин пользователя
 * @param {string} password - Пароль пользователя
 * @returns {Promise<Object>} Результат запроса
 */
async function authUser(login, password) {
	const url = `${BASE_URL}/users/login`;
	return await sendRequest(url, 'POST', { login, password });
}

/**
 * Получает список профилей, связанных с пользователем
 * @async
 * @param {number} id - Идентификатор пользователя
 * @returns {Promise<Object>} Результат запроса
 */
async function getProfiles(id) {
	const url = `${BASE_URL}/profiles?forUser=${id}`;
	return await sendRequest(url, 'GET');
}

/**
 * Получает профиль конкретного пользователя
 * @async
 * @param {number} userId - Идентификатор пользователя
 * @returns {Promise<Object>} Результат запроса
 */
async function getProfile(userId) {
	const url = `${BASE_URL}/profiles/${userId}`;
	return await sendRequest(url, 'GET');
}

/**
 * Выходит из системы
 * @async
 * @returns {Promise<Object>} Результат запроса
 */
async function logoutUser() {
	const url = `${BASE_URL}/users/logout`;
	return await sendRequest(url, 'POST');
}

/**
 * Удаляет пользователя
 * @async
 * @param {number} userId - Идентификатор пользователя
 * @returns {Promise<Object>} Результат запроса
 */
async function deleteUser(userId) {
	const url = `${BASE_URL}/users/${userId}`;
	return await sendRequest(url, 'DELETE');
}

/**
 * Проверяет, активна ли сессия пользователя
 * @async
 * @returns {Promise<Object>} Результат запроса
 */
async function checkSession() {
	const url = `${BASE_URL}/users/checkSession`;
	return await sendRequest(url, 'GET');
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
