import BaseComponent from '@basecomp';
import templateHBS from './profileInfo.hbs';
import api from '@network';
import store from '@store';

interface ProfileInfoParams {
	srcPersonPictureError: string;
	srcPersonPicture: string;
	personName: string;
	personAge: number;
	personDescription: string;
	aboutMeTitle?: string;
	aboutMeText?: string;
	interests?: string[];
	data?: Array<{ title: string, content: string }>;
	dataTitle?: string;
}

const DEFAULT_PARAMS_PROFILE_INFO: ProfileInfoParams = {
	srcPersonPictureError: 'media/error/400x600.jpg',
	srcPersonPicture: '',
	personName: 'Имя',
	personAge: 16,
	personDescription: 'Краткое описание человека...',
	aboutMeTitle: 'Обо мне',
	aboutMeText: 'Информация обо мне...',
	interests: ['Интерес 1', 'Интерес 2'],
	data: [
		{ title: 'Поле 1', content: 'Значение 1' },
		{ title: 'Поле 2', content: 'Значение 2' }
	],
	dataTitle: 'Данные'
};

interface Callback {
	event: string;
	selector: string;
	callback: (event: Event) => void;
}

export default class ProfileInfoCard extends BaseComponent {
	private callbacks: Callback[];
	private initialParams: Partial<ProfileInfoParams>;
	private profileContainer: HTMLElement | null;

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
		this.profileContainer = null;
	}

	private updateTemplate(data: any): void {
		if (!this.profileContainer) {
			console.error('Profile container not found');
			return;
		}

		// Преобразуем данные API в формат для шаблона
		const templateParams: ProfileInfoParams = {
			...DEFAULT_PARAMS_PROFILE_INFO,
			...this.initialParams,
			personName: data.name || DEFAULT_PARAMS_PROFILE_INFO.personName,
			personAge: data.age || DEFAULT_PARAMS_PROFILE_INFO.personAge,
			personDescription: data.description || DEFAULT_PARAMS_PROFILE_INFO.personDescription,
			aboutMeText: data.about || DEFAULT_PARAMS_PROFILE_INFO.aboutMeText,
			interests: data.interests || DEFAULT_PARAMS_PROFILE_INFO.interests,
			data: [
				{ title: 'Email', content: data.email || 'Не указан' },
				{ title: 'Телефон', content: data.phone || 'Не указан' },
				// Добавьте другие поля по необходимости
			]
		};

		// Генерируем новый HTML только для компонента профиля
		const newHTML = templateHBS(templateParams);

		// Заменяем только содержимое контейнера профиля
		this.profileContainer.innerHTML = newHTML;

		// Повторно привязываем обработчики событий
		this.attachListeners();
	}

	async render(): Promise<void> {
		// Сначала рендерим с начальными параметрами
		super.render();

		// Находим контейнер профиля внутри родительского элемента
		this.profileContainer = this.parentElement.querySelector('.profileInfo');
		if (!this.profileContainer) {
			console.error('Failed to find profile container');
			return;
		}

		// Привязываем обработчики событий
		this.callbacks.forEach((callback) => {
			this.addListener(callback.event, callback.selector, callback.callback);
		});
		this.attachListeners();

		try {
			const userId = store.getState('myID');
			console.log('Current user ID from store:', userId);

			if (userId === undefined) {
				console.warn('User ID is undefined in store');
				return;
			}

			const response = await api.getProfile(userId as number);
			console.log('API response:', response);

			if (response.success && response.data) {
				console.log('Profile data loaded:', response.data);
				this.updateTemplate(response.data);
			} else {
				console.warn('Failed to load profile:', response.message);
			}
		} catch (error) {
			console.error('Error loading profile:', error);
		}
	}
}
