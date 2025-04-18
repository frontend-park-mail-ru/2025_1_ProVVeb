import BaseComponent from '@basecomp';
import templateHBS from './profileInfo.hbs';
import api from '@network';
import store from '@store';
import { parseBirthday } from '@modules/tools';
import { arraysEqual } from '@modules/tools';

interface ProfileInfoParams {
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
	photos: Array<{ id: number, src: string, isNew?: boolean } | null>;
	maxPhotos: number;
}

const DEFAULT_PARAMS_PROFILE_INFO: ProfileInfoParams = {
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
	private currentPhotos: Array<{ id: number; src: string; isNew?: boolean } | null>;
	private initialPhotosFromData: Array<{ id: number; src: string; isNew?: boolean }> = [];
	private lastUsedId = 0;

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
		this.currentPhotos = Array(DEFAULT_PARAMS_PROFILE_INFO.maxPhotos).fill(null);
	}

	private generateId(): number {
		return Number(`${Date.now()}${this.lastUsedId++}`);
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
			const retryButton = this.parentElement.querySelector('.uploadPhotos__retryBtn');
			if (retryButton) {
				retryButton.addEventListener('click', () => {
					this.showLoadingState();
					retryCallback();
				});
			}
		}
	}

	private handleAddPhoto(): void {
		const fileInput = document.createElement('input');
		fileInput.type = 'file';
		fileInput.accept = 'image/*';
		fileInput.className = 'hiddenPhotoInput';

		fileInput.addEventListener('change', () => {
			if (fileInput.files && fileInput.files[0]) {
				const file = fileInput.files[0];
				if (!file.type.match('image.*')) {
					alert('Выберите файл с форматом изображения');
					return;
				}

				const reader = new FileReader();
				reader.onload = (event) => {
					if (!event.target || !event.target.result) {
						console.error('Ошибка чтения файла при загрузке');
						return;
					}

					const emptySlotIndex = this.currentPhotos.findIndex(p => p === null);

					if (emptySlotIndex !== -1) {
						this.currentPhotos[emptySlotIndex] = {
							id: this.generateId(),
							src: event.target.result as string,
							isNew: true
						};
						this.renderPhotos();
						this.updateSubmitButton(); // Обновляем состояние кнопки
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

	private async handleRemovePhoto(removeButton: HTMLElement): Promise<void> {
		const photoItem = removeButton.closest('.photosGrid__item');
		if (!photoItem) return;

		const photoId = parseInt(photoItem.getAttribute('data-id') as string);
		const photoIndex = this.currentPhotos.findIndex(p => p?.id === photoId);

		if (photoIndex === -1) return;

		const photo = this.currentPhotos[photoIndex];
		if (!photo) return;

		const savedPhotosCount = this.currentPhotos.filter(p => p && !p.isNew).length;
		const newPhotosCount = this.currentPhotos.filter(p => p?.isNew).length;

		if (!photo.isNew && savedPhotosCount <= 1 && newPhotosCount > 0) {
			alert('Нельзя удалить последнюю сохранённую фотографию, пока есть несохранённые изменения');
			return;
		}

		// Проверяем общее минимальное количество фотографий
		if (this.currentPhotos.filter(p => p !== null).length <= 1) {
			alert('В профиле должна быть хотя бы одна фотография');
			return;
		}

		if (photo.isNew) {
			this.currentPhotos[photoIndex] = null;
			this.currentPhotos.sort((a, b) => (a === null ? 1 : b === null ? -1 : 0));
			this.renderPhotos();
		} else {
			if (!confirm('Удалить эту фотографию с сервера?')) return;

			try {
				const fullUrl = photo.src;
				const fileName = fullUrl.split('/').pop();

				if (!fileName) {
					alert('Не удалось определить имя файла');
					return;
				}

				const response = await api.deletePhoto(
					store.getState('myID') as number,
					fileName
				);

				if (response.success && response.data) {
					this.currentPhotos[photoIndex] = null;
					this.currentPhotos.sort((a, b) => (a === null ? 1 : b === null ? -1 : 0));
					this.renderPhotos();
				} else {
					alert('Неизвестная ошибка при удалении фотографии');
				}
			} catch (error) {
				console.error('Ошибка при удалении фотографии:', error);
				this.showErrorState('Ошибка удаления фотографии', () => this.render());
				alert('Не удалось удалить фотографию');
			}
		}

		this.updateSubmitButton();
	}
	private setupPhotoHandlers(): void {
		const photosGrid = this.parentElement.querySelector('#photosGridId');
		if (!photosGrid) return;

		photosGrid.addEventListener('click', (e) => {
			const target = e.target as HTMLElement;
			if (target.classList.contains('uploadPhotos__addPhotoBtn')) {
				this.handleAddPhoto();
			} else if (target.classList.contains('uploadPhotos__removePhotoBtn')) {
				e.stopPropagation(); // Предотвращаем всплытие события
				e.preventDefault(); // Предотвращаем действие по умолчанию
				this.handleRemovePhoto(target);
			}
		});

		const cancelBtn = this.parentElement.querySelector('.uploadPhotos__cancelBtn');
		if (cancelBtn) {
			cancelBtn.addEventListener('click', () => {
				const hasChanges = !arraysEqual(
					this.currentPhotos.map(p => p?.src),
					this.initialPhotosFromData.map(p => p.src)
				);

				if (hasChanges) {
					if (confirm('Вы уверены, что хотите отменить все изменения?' +
						'Все добавленные фотографии будут удалены')) {
						this.currentPhotos = [
							...this.initialPhotosFromData,
							...Array(DEFAULT_PARAMS_PROFILE_INFO.maxPhotos - this.initialPhotosFromData.length).fill(null)
						].slice(0, DEFAULT_PARAMS_PROFILE_INFO.maxPhotos);
						this.renderPhotos();
						alert('Все изменения отменены. Возвращено исходное состояние');
					}
				} else {
					alert('Нет изменений для отмены');
				}
			});
		}

		const uploadPhotosFrom = this.parentElement.querySelector('#uploadPhotos__from');
		if (uploadPhotosFrom) {
			uploadPhotosFrom.addEventListener('submit', async (e) => {
				e.preventDefault();
				const photos = this.currentPhotos.filter(p => p !== null) as { id: number, src: string, isNew?: boolean }[];

				if (photos.length === 0) {
					alert('Должна быть хотя бы одна фотография!');
					return;
				}

				const newPhotos = photos.filter(photo => photo.isNew);

				try {
					const response = await api.uploadPhotos(store.getState('myID') as number, newPhotos);

					if (response.success && response.data) {
						const uploadedFiles = response.data.uploaded_files || [];

						let uploadedIndex = 0;
						this.currentPhotos = this.currentPhotos.map(photo => {
							if (photo && photo.isNew && uploadedIndex < uploadedFiles.length) {
								return {
									...photo,
									src: api.BASE_URL_PHOTO + uploadedFiles[uploadedIndex++],
									isNew: false
								};
							}
							return photo;
						});

						this.initialPhotosFromData = this.currentPhotos
							.filter(p => p !== null)
							.map(p => ({ id: p!.id, src: p!.src }));

						this.renderPhotos();
						this.updateSubmitButton(); // Обновляем состояние кнопки после сохранения

						alert(`Сохранено ${uploadedFiles.length} фотографий`);
					} else {
						this.showErrorState('Ошибка загрузки профиля', () => this.render());
						alert(`Ошибка при сохранении фотографий`);
					}
				} catch (error) {
					console.error('Ошибка при загрузке фотографий:', error);
					this.showErrorState('Ошибка соединения', () => this.render());
					alert('Ошибка при сохранении фотографий');
				}
			});
		}
	}

	private updateTemplate(data: any): void {
		const { year, month, day } = parseBirthday(data.birthday) || {};
		const currentYear = new Date().getFullYear();
		const formattedBirthday = (day && month && year)
			? `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${currentYear - year}`
			: 'Не указан';

		if (data.photos && data.photos.length > 0 && this.initialPhotosFromData.length === 0) {
			this.initialPhotosFromData = data.photos.map((photo: string) => ({
				id: this.generateId(),
				src: api.BASE_URL_PHOTO + photo
			}));

			this.currentPhotos = [
				...this.initialPhotosFromData,
				...Array(DEFAULT_PARAMS_PROFILE_INFO.maxPhotos - this.initialPhotosFromData.length).fill(null)
			].slice(0, DEFAULT_PARAMS_PROFILE_INFO.maxPhotos);
		}

		const templateParams: ProfileInfoParams = {
			...DEFAULT_PARAMS_PROFILE_INFO,
			...this.initialParams,
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

	private updateSubmitButton(): void {
		const submitBtn = this.parentElement.querySelector('.uploadPhotos__submitBtn') as HTMLButtonElement;
		if (!submitBtn) return;

		const hasNewPhotos = this.currentPhotos.some(p => p?.isNew);
		submitBtn.disabled = !hasNewPhotos;
	}

	private renderPhotos(): void {
		const photosGrid = this.parentElement.querySelector('#photosGridId');
		if (!photosGrid) return;

		photosGrid.innerHTML = '';

		this.currentPhotos.forEach((photo, index) => {
			if (photo) {
				const photoElement = document.createElement('div');
				photoElement.className = `photosGrid__item ${photo.isNew ? 'new-photo' : ''}`;
				photoElement.dataset.id = photo.id.toString();
				photoElement.innerHTML = `
                    <img src="${photo.src}" alt="Фото профиля">
                    <button class="uploadPhotos__removePhotoBtn" title="Удалить">×</button>
                `;
				photosGrid.appendChild(photoElement);
			} else if (index < DEFAULT_PARAMS_PROFILE_INFO.maxPhotos) {
				const slotElement = document.createElement('div');
				slotElement.className = 'photosGrid__item emptyPhotoSlot';
				slotElement.innerHTML = `
                    <div class="uploadPhotos__addPhotoBtn" title="Добавить фото">+</div>
                `;
				photosGrid.appendChild(slotElement);
			}
		});

		this.updateSubmitButton();
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

			if (response.success && response.data) {
				this.updateTemplate(response.data);
			} else {
				this.showErrorState('Ошибка загрузки профиля', () => this.render());
			}
		} catch (error) {
			this.showErrorState('Ошибка соединения', () => this.render());
		}
	}
}
