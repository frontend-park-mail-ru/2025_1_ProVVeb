import BaseComponent from '@basecomp';
import templateHBS from './profileInfo.hbs';
import api from '@network';
import store from '@store';
import { parseBirthday } from '@modules/tools';

interface ProfileInfoParams {
	srcPictureError: string;
	srcPicture: string;
	firstName: string;
	lastName: string;
	age: number | '≥ 18';
	aboutMeTitle: string;
	aboutMeText: string;
	interestsTitle: string;
	interests: string[];
	dataTitle: string;
	data: Array<{ title: string, content: string }>;
	picturesTitle: string;
	isLoading: boolean;
	isError: boolean;
	errorMessage: string;
}

const DEFAULT_PARAMS_PROFILE_INFO: ProfileInfoParams = {
	srcPictureError: 'media/error/400x600.jpg',
	srcPicture: '',
	firstName: 'Имя',
	lastName: 'Фамилия',
	age: 16,
	aboutMeTitle: 'Обо мне',
	aboutMeText: 'Краткое описание обо мне...',
	interestsTitle: 'Мои интересы',
	interests: ['Интерес 1', 'Интерес 2'],
	dataTitle: 'Мои данные',
	data: [
		{ title: 'Поле 1', content: 'Значение 1' },
	],
	picturesTitle: 'Мои фото',
	isLoading: false,
	isError: false,
	errorMessage: ''
};

interface Callback {
	event: string;
	selector: string;
	callback: (event: Event) => void;
}

export default class ProfileInfoCard extends BaseComponent {
	private callbacks: Callback[];
	private initialParams: Partial<ProfileInfoParams>;
	private retryCallback: (() => void) | null;

	constructor(
		parentElement: HTMLElement,
		paramsHBS: Partial<ProfileInfoParams> = {},
		callbacks: Callback[] = []
	) {
		const finalParamsHBS = { ...DEFAULT_PARAMS_PROFILE_INFO, ...paramsHBS };
		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);

		this.callbacks = callbacks;
		this.initialParams = paramsHBS;
		this.retryCallback = null;
	}

	private showLoadingState(): void {
		const loadingParams: ProfileInfoParams = {
			...DEFAULT_PARAMS_PROFILE_INFO,
			isLoading: true,
			isError: false
		};

		this.replaceContent(templateHBS(loadingParams));
	}

	private showErrorState(message: string = 'Не удалось загрузить данные', retryCallback?: () => void): void {
		this.retryCallback = retryCallback || null;

		const errorParams: ProfileInfoParams = {
			...DEFAULT_PARAMS_PROFILE_INFO,
			isLoading: false,
			isError: true,
			errorMessage: message
		};

		this.replaceContent(templateHBS(errorParams));

		if (retryCallback) {
			const retryButton = this.parentElement.querySelector('.profile-retry-button');
			if (retryButton) {
				retryButton.addEventListener('click', () => {
					this.showLoadingState();
					retryCallback();
				});
			}
		}
	}

	private updateTemplate(data: any): void {
		const { year, month, day } = parseBirthday(data.birthday) || {};
		const currentYear = new Date().getFullYear();
		const formattedBirthday = (day && month && year)
			? `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${currentYear - year}`
			: 'Не указан';

		const templateParams: ProfileInfoParams = {
			...DEFAULT_PARAMS_PROFILE_INFO,
			...this.initialParams,
			srcPicture: data.card,
			firstName: data.firstName,
			lastName: data.lastName,
			age: year ?? '≥ 18',
			aboutMeText: data.description,
			interests: data.interests || DEFAULT_PARAMS_PROFILE_INFO.interests,
			data: [
				{ title: 'Рост', content: data.height || 'Не указан' },
				{ title: 'Локация', content: data.location || 'Не указан' },
				{ title: 'Гендер', content: data.isMale ? 'Мужчина' : 'Женщина' },
				{ title: 'Дата рождения', content: formattedBirthday },
			],
			isLoading: false,
			isError: false
		};
		this.replaceContent(templateHBS(templateParams));
		this.attachListeners();
	}

	private replaceContent(newHTML: string): void {
		const existingProfile = this.parentElement.querySelector('.profileInfo');

		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = newHTML;
		const newProfile = tempDiv.firstChild as HTMLElement;

		if (existingProfile) {
			this.parentElement.replaceChild(newProfile, existingProfile);
		} else {
			this.parentElement.appendChild(newProfile);
		}
	}

	async render(): Promise<void> {
		this.showLoadingState();

		this.callbacks.forEach((callback) => {
			this.addListener(callback.event, callback.selector, callback.callback);
		});
		this.attachListeners();

		try {
			const userId = store.getState('myID');
			if (userId === undefined) {
				this.showErrorState('ID пользователя не найден');
				return;
			}

			const response = await api.getProfile(userId as number);
			console.log('API response:', response);

			if (response.success && response.data) {
				console.log('Profile data loaded:', response.data);
				this.updateTemplate(response.data);
			} else {
				this.showErrorState('Ошибка загрузки профиля', () => this.render());
			}
		} catch (error) {
			this.showErrorState('Ошибка соединения', () => this.render());
		}
	}
}
