const BASE_URL = 'http://213.219.214.83:8080';

async function sendRequest(url, method, data = null) {
	try {
		const options = {
			method: method,
			headers: {
				'Content-Type': 'application/json'
			}
		};

		// Если есть данные для отправки, добавляем их в body запроса
		if (data) {
			options.body = JSON.stringify(data);
		}

		const response = await fetch(url, options);

		if (response.ok) { // То же, что и response.status >= 200 && < 300
			const responseData = await response.json();
			return { success: true, message: responseData.message };
		} else {
			const errorText = await response.text();
			return { success: false, message: errorText };
		}
	} catch (error) {
		// Ловим ошибки сети и другие исключения
		return { success: false, message: error.message };
	}
}

// Пример использования для регистрации
async function loginUser(login, password) {
	const url = BASE_URL + '/users';
	const data = { name: login, password: password };

	const result = await sendRequest(url, 'POST', data);

	if (result.success) {
		console.log('Success:', result.message);
	} else {
		console.log('Error:', result.message);
	}
}

// Пример использования
// registerUser('myLogin', 'myPassword');

async function authUser(login, password) {
	const url = BASE_URL + '/users/login';
	const data = { name: login, password: password };

	const result = await sendRequest(url, 'POST', data);

	if (result.success) {
		console.log('Result:', result);
		const { ID, message } = result.data; // Извлекаем ID и сообщение из ответа
		console.log('Login Success:', message);
		console.log('User ID:', ID);
	} else {
		console.log('Login Failed:', result.message);
	}
}

export default authUser;

// async function getProfiles(id) {
// 	const url = `/profiles?forUser=${id}`; // Формируем URL с параметром в query string

// 	try {
// 		const response = await fetch(url, { method: 'GET' });

// 		// Проверка статуса ответа
// 		if (response.ok) { // То же, что и response.status >= 200 && < 300
// 			const responseData = await response.json(); // Получаем данные в формате JSON
// 			console.log('Success:', responseData); // Выводим полученные данные
// 		} else {
// 			const errorText = await response.text(); // Получаем текст ошибки, если статус не 200
// 			console.log('Error:', errorText); // Выводим ошибку
// 		}
// 	} catch (error) {
// 		// Ловим ошибки сети и другие исключения
// 		console.log('Request failed', error);
// 	}
// }

// // Пример использования
// getProfiles('123'); // Здесь 123 - это id пользователя
