import BaseComponent from '@basecomp';
import templateHBS from './profileInfo.hbs';
import api from '@network';
import store from '@store';

interface ProfileInfoParams {
    srcPersonPictureError: string;
    srcPersonPicture: string;
    personName: string;
    personAge: number;
    aboutMeTitle: string;
    aboutMeText: string;
    interestsTitle: string;
    interests: string[];
    dataTitle: string;
    data: Array<{ title: string, content: string }>;
    isLoading?: boolean;
}

const DEFAULT_PARAMS_PROFILE_INFO: ProfileInfoParams = {
    srcPersonPictureError: 'media/error/400x600.jpg',
    srcPersonPicture: '',
    personName: 'Имя',
    personAge: 16,
    aboutMeTitle: 'Обо мне',
    aboutMeText: 'Краткое описание обо мне...',
    interestsTitle: 'Мои интересы',
    interests: ['Интерес 1', 'Интерес 2'],
    dataTitle: 'Мои данные',
    data: [
        { title: 'Поле 1', content: 'Значение 1' },
        { title: 'Поле 2', content: 'Значение 2' }
    ],
    isLoading: false
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

    private showLoadingState(): void {
        if (!this.profileContainer) return;

        const loadingParams: ProfileInfoParams = {
            ...DEFAULT_PARAMS_PROFILE_INFO,
            aboutMeText: 'Загрузка данных...',
            interests: ['Загрузка...'],
            data: [
                { title: 'Загрузка', content: '...' }
            ],
            isLoading: true
        };

        this.profileContainer.innerHTML = templateHBS(loadingParams);
    }

    private updateTemplate(data: any): void {
        if (!this.profileContainer) {
            console.error('Profile container not found');
            return;
        }

        const templateParams: ProfileInfoParams = {
            ...DEFAULT_PARAMS_PROFILE_INFO,
            ...this.initialParams,
            srcPersonPicture: data.card,
            personName: data.firstName,
            personAge: data.age,
            aboutMeText: data.description,
            interests: data.interests || DEFAULT_PARAMS_PROFILE_INFO.interests,
            data: [
                { title: 'Рост', content: data.height || 'Не указан' },
                { title: 'Локация', content: data.location || 'Не указан' },
            ],
            isLoading: false
        };

        const newHTML = templateHBS(templateParams);
        this.profileContainer.innerHTML = newHTML;
        this.attachListeners();
    }

    async render(): Promise<void> {
        super.render();

        this.profileContainer = this.parentElement.querySelector('.profileInfo');
        if (!this.profileContainer) {
            console.error('Failed to find profile container');
            return;
        }

        // Показываем состояние загрузки
        this.showLoadingState();

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
                // Можно показать состояние ошибки
                this.showLoadingState(); // Или создать метод showErrorState()
            }
        } catch (error) {
            console.error('Error loading profile:', error);
            // Показываем состояние ошибки
            this.showLoadingState(); // Или создать метод showErrorState()
        }
    }
}