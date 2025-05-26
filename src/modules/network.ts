// const IP = '213.219.214.83';
const IP = 'localhost';
// const IP = 'beameye.ru';

const BASE_URL = `http://${IP}/api`;
const BASE_URL_PHOTO = `http://${IP}/img/profile-photos`;
const WS_CHAT_URL = `ws://${IP}/api/chats`;
const WS_NOTIF_URL = `ws://${IP}/api/notifications`;
// const BASE_URL = `http://${IP}:8080`;
// const BASE_URL_PHOTO = `http://${IP}:8030/profile-photos`;
// const WS_CHAT_URL = `ws://${IP}:8080/chats`;
// const WS_NOTIF_URL = `ws://${IP}:8080/notifications`;

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
	Premium: {
		Status: boolean;
		Border: number;
	}
}

export interface User {
	id: number,
	login: string,
	password: string,
	email: string,
	phone: string,
	status: number
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
			mode: 'cors',
			credentials: 'include',
		};

		const isActuallyMultipart = isMultipart || data instanceof FormData;

		if (data) {
			if (isActuallyMultipart) {
				options.body = data instanceof FormData ? data : objectToFormData(data);
			} else {
				options.headers = {
					'Content-Type': 'application/json',
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
	const [mimePart, dataPart] = base64.split(';base64,');
	const mime = mimePart.split(':')[1];
	const byteString = atob(dataPart);

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
): Promise<ApiResponse<{
	uploaded_files: never[]; urls: string[]
}>> {
	const url = `${BASE_URL}/profiles/uploadPhoto?forUser=${userId}`;
	const formData = new FormData();

	photos.forEach((photo) => {
		if (photo.src.startsWith('data:')) {
			const blob = base64ToBlob(photo.src);
			formData.append('images', blob, `image_${photo.id}.png`);
		}
	});

	return sendRequest(url, 'POST', formData);
}

async function deletePhoto(userId: number, srcPhoto: string): Promise<ApiResponse> {
	const url = `${BASE_URL}/profiles/deletePhoto?id=${userId}&file_url=${srcPhoto}`;
	return sendRequest(url, 'DELETE');
}

async function loginUser(user: User, profile: Profile): Promise<ApiResponse> {
	const url = `${BASE_URL}/users`;
	return sendRequest(url, 'POST', { user, profile });
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

async function updateProfile(data: {
	[key: string]: string | number | boolean | string[];
}): Promise<ApiResponse> {
	const url = `${BASE_URL}/profiles/update`;
	return sendRequest(url, 'POST', data);
}

async function sendFeedback(score: number, answer: string): Promise<ApiResponse> {
	const url = `${BASE_URL}/queries/sendResp`;
	return sendRequest(url, 'POST', { name: 'CSAT', score, answer });
}

async function getCards() {
	const url = `${BASE_URL}/queries/getForQuery`;
	return sendRequest(url, 'GET');
}

async function sendComplaint(
	header: string,
	body: string,
	forWhom?: number,
): Promise<ApiResponse> {
	const url = `${BASE_URL}/complaints/create`;

	const params: {
		complaint_type: string;
		complaint_text: string;
		complaint_on?: number
	} = {
		complaint_type: header,
		complaint_text: body,
	};

	if (forWhom) {
		params.complaint_on = forWhom;
	}

	return sendRequest(url, 'POST', params);
}

async function profilesBySearch(
	input: string,
	isMale: 'Male' | 'Any' | 'Female',
	ageMin: number,
	ageMax: number,
	heightMin: number,
	heightMax: number,
	country: string,
	city: string,
): Promise<ApiResponse<Profile[]>> {
	const url = `${BASE_URL}/profiles/search`;

	const params = {
		input,
		isMale,
		ageMin,
		ageMax,
		heightMin,
		heightMax,
		country,
		city,
	};

	return sendRequest(url, 'POST', params);
}

async function getChats() {
	const url = `${BASE_URL}/chats`;
	return sendRequest(url, 'GET');
}

async function createChat(
	firstID: number,
	secondID: number
) {
	const url = `${BASE_URL}/chats/create`;
	return sendRequest(url, 'POST', { firstID, secondID });
}

async function changeBorder(new_border: number) {
	const url = `${BASE_URL}/subsription/changeborder`;
	return sendRequest(url, 'POST', { new_border });
}

export default {
	BASE_URL_PHOTO,
	BASE_URL,
	WS_CHAT_URL,
	WS_NOTIF_URL,
	updateProfile,
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
	sendFeedback,
	getCards,
	sendComplaint,
	profilesBySearch,
	getChats,
	createChat,
	changeBorder,
};
