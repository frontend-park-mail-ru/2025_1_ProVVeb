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
	photos: Array<{ id: number, src: string } | null>;
	maxPhotos: number;
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
	errorMessage: '',
	photos: [
		...Array(6).fill(null)
	],
	maxPhotos: 6
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
	private currentPhotos: Array<{ id: number; src: string } | null>;
	private initialPhotoFromData: { id: number; src: string } | null = null;

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
		this.currentPhotos = Array(6).fill(null);
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

		if (data.card && !this.initialPhotoFromData) {
			this.initialPhotoFromData = {
				id: Date.now(),
				src: data.card
			};
			this.currentPhotos[0] = this.initialPhotoFromData;
		}

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
			isError: false,
			photos: this.currentPhotos
		};
		this.replaceContent(templateHBS(templateParams));
		this.attachListeners();
		this.setupPhotoHandlers();
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

	private renderPhotos(): void {
		const photosGrid = this.parentElement.querySelector('#photosGrid');
		if (!photosGrid) return;

		photosGrid.innerHTML = '';

		this.currentPhotos.forEach((photo, index) => {
			if (photo) {
				const photoElement = document.createElement('div');
				photoElement.className = 'photo-item';
				photoElement.dataset.id = photo.id.toString();
				photoElement.innerHTML = `
                    <img src="${photo.src}" alt="Фото профиля">
                    <button class="remove-btn" title="Удалить">×</button>
                `;
				photosGrid.appendChild(photoElement);
			} else if (index < DEFAULT_PARAMS_PROFILE_INFO.maxPhotos) {
				const slotElement = document.createElement('div');
				slotElement.className = 'photo-item add-photo-slot';
				slotElement.innerHTML = `
                    <div class="add-photo-btn" title="Добавить фото">+</div>
                `;
				photosGrid.appendChild(slotElement);
			}
		});

		this.updateSubmitButton();
	}

	private updateSubmitButton(): void {
		const submitBtn = this.parentElement.querySelector('.submit-btn') as HTMLButtonElement;
		if (!submitBtn) return;

		const hasPhotos = this.currentPhotos.some(p => p !== null);
		submitBtn.disabled = !hasPhotos;
	}

	private setupPhotoHandlers(): void {
		const photosGrid = this.parentElement.querySelector('#photosGrid');
		if (!photosGrid) return;

		photosGrid.addEventListener('click', (e) => {
			const target = e.target as HTMLElement;

			if (target.classList.contains('add-photo-btn')) {
				this.handleAddPhoto();
			} else if (target.classList.contains('remove-btn')) {
				this.handleRemovePhoto(target);
			}
		});

		const cancelBtn = this.parentElement.querySelector('.cancel-btn');
		if (cancelBtn) {
			cancelBtn.addEventListener('click', () => {
				// Проверяем, есть ли изменения для отмены
				const hasChanges = !this.currentPhotos.every((photo, index) => {
					// Первая фотография может быть исходной из data.card
					if (index === 0 && this.initialPhotoFromData) {
						return photo?.src === this.initialPhotoFromData.src;
					}
					return photo === null;
				});

				if (hasChanges) {
					if (confirm('Вы уверены, что хотите отменить все изменения? Все добавленные фотографии будут удалены.')) {
						// Восстанавливаем исходное состояние
						this.currentPhotos = Array(6).fill(null);
						if (this.initialPhotoFromData) {
							this.currentPhotos[0] = { ...this.initialPhotoFromData };
						}
						this.renderPhotos();
						alert('Все изменения отменены. Возвращено исходное состояние.');
					}
				} else {
					alert('Нет изменений для отмены.');
				}
			});
		}

		const photoUploadForm = this.parentElement.querySelector('#photoUploadForm');
		if (photoUploadForm) {
			photoUploadForm.addEventListener('submit', (e) => {
				e.preventDefault();
				const photos = this.currentPhotos.filter(p => p !== null);

				if (photos.length === 0) {
					alert('Ошибка: должен быть хотя бы один фото!');
					return;
				}

				console.log('Фотографии для сохранения:', photos);
				alert(`Сохранено ${photos.length} фотографий`);
			});
		}
	}

	private handleAddPhoto(): void {
		const fileInput = document.createElement('input');
		fileInput.type = 'file';
		fileInput.accept = 'image/*';
		fileInput.className = 'hidden-input';

		fileInput.addEventListener('change', () => {
			if (fileInput.files && fileInput.files[0]) {
				const file = fileInput.files[0];
				if (!file.type.match('image.*')) {
					alert('Пожалуйста, выберите изображение');
					return;
				}

				const reader = new FileReader();
				reader.onload = (event) => {
					// Добавляем проверку на существование event.target
					if (!event.target || !event.target.result) {
						console.error('Ошибка чтения файла');
						return;
					}

					const emptySlotIndex = this.currentPhotos.findIndex(p => p === null);

					if (emptySlotIndex !== -1) {
						this.currentPhotos[emptySlotIndex] = {
							id: Date.now(),
							src: event.target.result as string
						};
						this.renderPhotos();
					}
				};
				reader.onerror = () => {
					console.error('Ошибка при чтении файла');
				};
				reader.readAsDataURL(file);
			}
		});

		fileInput.click();
	}

	private handleRemovePhoto(removeButton: HTMLElement): void {
		if (confirm('Удалить эту фотографию?')) {
			const photoItem = removeButton.closest('.photo-item');
			if (!photoItem) return;

			const photoId = parseInt(photoItem.getAttribute('data-id') || '0');

			// Удаляем фото из массива
			const photoIndex = this.currentPhotos.findIndex(p => p && p.id === photoId);

			if (photoIndex !== -1) {
				// Удаляем фото и смещаем остальные
				this.currentPhotos[photoIndex] = null;
				this.currentPhotos.sort((a, b) => {
					if (a === null) return 1;
					if (b === null) return -1;
					return 0;
				});

				this.renderPhotos();
			}
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
