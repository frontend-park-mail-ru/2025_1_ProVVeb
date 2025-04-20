// const BASE_URL_PHOTO = 'http://213.219.214.83:8030/profile-photos';
// const BASE_URL = 'http://213.219.214.83:8080';
const BASE_URL = 'http://localhost:8080';
const BASE_URL_PHOTO = 'http://localhost:8030/profile-photos';

interface ApiResponse<T = any> {
	success: boolean;
	data?: T;
	message?: string;
}

export interface Profile {
	profileId: number;
	firstName: string;
	lastName: string;
	isMale: boolean;
	height: number;
	birthday: string;
	description: string;
	location: string;
	interests: string[];
	likedBy: number[];
	photos: string[];
	preferences: { [key: string]: string; };
}

async function sendRequest<T>(
	url: string,
	method: string,
	data: object | FormData | null = null,
	isMultipart: boolean = false
): Promise<ApiResponse<T>> {
	try {
		const options: RequestInit = {
			method,
			mode: "cors",
			credentials: "include",
		};

		// Если передается FormData, автоматически определяем multipart
		const isActuallyMultipart = isMultipart || data instanceof FormData;

		if (data) {
			if (isActuallyMultipart) {
				// Для FormData Content-Type НЕ указываем вручную, браузер сам добавит boundary
				options.body = data instanceof FormData ? data : objectToFormData(data);
			} else {
				options.headers = {
					"Content-Type": "application/json",
				};
				options.body = JSON.stringify(data);
			}
		}

		const response = await fetch(url, options);

		if (response.ok) {
			const responseData = await response.json();
			return { success: true, data: responseData };
		}

		const errorText = await response.text();
		return { success: false, message: errorText };
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : String(error),
		};
	}
}

function objectToFormData(obj: object): FormData {
	const formData = new FormData();
	Object.entries(obj).forEach(([key, value]) => {
		if (value instanceof File || value instanceof Blob) {
			formData.append(key, value);
		} else if (Array.isArray(value)) {
			value.forEach((item) => formData.append(key, item));
		} else {
			formData.append(key, String(value));
		}
	});
	return formData;
}

function base64ToBlob(base64: string): Blob {
	// Разделяем строку на части (тип MIME и данные)
	const [mimePart, dataPart] = base64.split(';base64,');
	const mime = mimePart.split(':')[1]; // "image/png"
	const byteString = atob(dataPart); // Декодируем base64

	// Преобразуем в ArrayBuffer
	const arrayBuffer = new ArrayBuffer(byteString.length);
	const uintArray = new Uint8Array(arrayBuffer);
	for (let i = 0; i < byteString.length; i++) {
		uintArray[i] = byteString.charCodeAt(i);
	}

	return new Blob([arrayBuffer], { type: mime });
}


async function uploadPhotos(
	userId: number,
	photos: { id: number; src: string }[]
): Promise<ApiResponse<{ urls: string[] }>> {
	const url = `${BASE_URL}/profiles/uploadPhoto?forUser=${userId}`;
	const formData = new FormData();

	photos.forEach((photo) => {
		if (photo.src.startsWith('data:')) {
			const blob = base64ToBlob(photo.src);
			formData.append('images', blob, `image_${photo.id}.png`);
		} else {
			// console.log(`Skipping already uploaded photo with ID: ${photo.id}`);
		}
	});

	return sendRequest(url, 'POST', formData);
}

async function deletePhoto(userId: number, srcPhoto: string): Promise<ApiResponse> {
	const url = `${BASE_URL}/profiles/deletePhoto?id=${userId}&file_url=${srcPhoto}`;
	return sendRequest(url, 'DELETE');
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
	const url = `${BASE_URL}/profiles/match/${userId}`;
	return sendRequest(url, 'GET');
}

async function Like(likeFrom: number, likeTo: number): Promise<ApiResponse> {
	const url = `${BASE_URL}/profiles/like`;
	return sendRequest(url, 'POST', { likeFrom, likeTo, status: 1 });
}

async function Dislike(likeFrom: number, likeTo: number): Promise<ApiResponse> {
	const url = `${BASE_URL}/profiles/like`;
	return sendRequest(url, 'POST', { likeFrom, likeTo, status: -1 });
}
//-----------------

export default {
	BASE_URL_PHOTO,
	BASE_URL,
	uploadPhotos,
	deletePhoto,
	getProfiles,
	authUser,
	loginUser,
	getProfile,
	logoutUser,
	deleteUser,
	checkSession,
	getMatches,
	Like,
	Dislike,
};
