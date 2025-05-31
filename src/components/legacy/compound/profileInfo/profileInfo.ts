import BaseComponent from '@basecomp';
import api from '@network';
import store from '@store';
import { parseBirthday, arraysEqual } from '@modules/utils';

import Notification from '@notification';
import Confirm from '@simple/confirm/confirm';
import { ProfileValidators } from '@modules/validation';
import templateHBS from './profileInfo.hbs';

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
		...Array(2).fill(null)
	],
	maxPhotos: 2
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

	private isMale: boolean;

	constructor(
		parentElement: HTMLElement,
		paramsHBS: Partial<ProfileInfoParams> = {},
		callbacks: Callback[] = []
	) {
		const finalParamsHBS = { ...DEFAULT_PARAMS_PROFILE_INFO, ...paramsHBS };

		if (store.getState('isPremium') as boolean) {
			DEFAULT_PARAMS_PROFILE_INFO.maxPhotos = 6;
		}

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

					const notification = new Notification({
						headTitle: 'Важное сообщение',
						title: 'Выберите файл с форматом изображения',
						isWarning: false,
						isWithButton: true,
					});
					notification.render();

					return;
				}

				const reader = new FileReader();
				reader.onload = (event) => {
					if (!event.target || !event.target.result) {
						console.error('Ошибка чтения файла при загрузке');
						return;
					}

					const emptySlotIndex = this.currentPhotos.findIndex((p) => p === null);

					if (emptySlotIndex !== -1) {
						this.currentPhotos[emptySlotIndex] = {
							id: this.generateId(),
							src: event.target.result as string,
							isNew: true
						};
						this.renderPhotos();
						this.updateSubmitButton();
					}
				};

				reader.onerror = () => {
					const notification = new Notification({
						headTitle: 'Что-то пошло не так...',
						title: 'Ошибка при чтении файла. Попробуйте еще раз',
						isWarning: false,
						isWithButton: true,
					});
					notification.render();
				};

				reader.readAsDataURL(file);
			}
		});

		fileInput.click();
	}

	private async handleRemovePhoto(removeButton: HTMLElement): Promise<void> {
		const photoItem = removeButton.closest('.photosGrid__item');
		if (!photoItem) { return; }

		const photoId = parseInt(photoItem.getAttribute('data-id') as string, 10);
		const photoIndex = this.currentPhotos.findIndex((p) => p?.id === photoId);

		if (photoIndex === -1) { return; }

		const photo = this.currentPhotos[photoIndex];
		if (!photo) { return; }

		const savedPhotosCount = this.currentPhotos.filter((p) => p && !p.isNew).length;
		const newPhotosCount = this.currentPhotos.filter((p) => p?.isNew).length;

		if (!photo.isNew && savedPhotosCount <= 1 && newPhotosCount > 0) {
			const notification = new Notification({
				headTitle: 'Что-то пошло не так...',
				title: 'Нельзя удалить последнюю сохранённую фотографию, пока есть несохранённые изменения',
				isWarning: false,
				isWithButton: true,
			});
			notification.render();
			return;
		}

		// Проверяем общее минимальное количество фотографий
		if (this.currentPhotos.filter((p) => p !== null).length <= 1) {
			const notification = new Notification({
				headTitle: 'Что-то пошло не так...',
				title: 'В профиле должна быть хотя бы одна фотография',
				isWarning: false,
				isWithButton: true,
			});
			notification.render();

			return;
		}

		if (photo.isNew) {
			this.currentPhotos[photoIndex] = null;
			this.currentPhotos.sort((a, b) => (a === null ? 1 : b === null ? -1 : 0));
			this.renderPhotos();
		} else {
			const confirmComponent = new Confirm({
				headTitle: 'Согласны?',
				title: 'Удалить эту фотографию с сервера?',
				isWarning: false,
			});
			const confirm = await confirmComponent.render();

			if (!confirm) { return; }

			try {
				const fullUrl = photo.src;
				const fileName = fullUrl.split('/').pop();

				if (!fileName) {
					const notification = new Notification({
						headTitle: 'Что-то пошло не так...',
						title: 'Не удалось определить имя файла',
						isWarning: false,
						isWithButton: true,
					});
					notification.render();

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

					if (this.currentPhotos[0]?.src !== store.getState('ava')) {
						store.setState('ava', this.currentPhotos[0]?.src);
					}
				} else {
					const notification = new Notification({
						headTitle: 'Что-то пошло не так...',
						title: 'Неизвестная ошибка при удалении фотографии',
						isWarning: false,
						isWithButton: true,
					});
					notification.render();

				}
			} catch (error) {
				this.showErrorState('Ошибка удаления фотографии', () => this.render());
				const notification = new Notification({
					headTitle: 'Что-то пошло не так...',
					title: 'Не удалось удалить фотографию',
					isWarning: false,
					isWithButton: true,
				});
				notification.render();

			}
		}

		this.updateSubmitButton();
	}

	private setupPhotoHandlers(): void {
		const photosGrid = this.parentElement.querySelector('#photosGridId');
		if (!photosGrid) { return; }

		photosGrid.addEventListener('click', (e) => {
			const target = e.target as HTMLElement;
			if (target.classList.contains('uploadPhotos__addPhotoBtn')) {
				this.handleAddPhoto();
			} else if (target.classList.contains('uploadPhotos__removePhotoBtn')) {
				e.stopPropagation();
				e.preventDefault();
				this.handleRemovePhoto(target);
			}
		});

		const uploadPhotosFrom = this.parentElement.querySelector('#uploadPhotos__form');
		if (uploadPhotosFrom) {
			uploadPhotosFrom.addEventListener('submit', async (e) => {
				e.preventDefault();
				const photos = this.currentPhotos.filter((p) => p !== null) as { id: number, src: string, isNew?: boolean }[];

				if (photos.length === 0) {
					const notification = new Notification({
						headTitle: 'Что-то пошло не так...',
						title: 'Должна быть хотя бы одна фотография!',
						isWarning: false,
						isWithButton: true,
					});
					notification.render();
					return;
				}

				const newPhotos = photos.filter((photo) => photo.isNew);

				try {
					const response = await api.uploadPhotos(store.getState('myID') as number, newPhotos);

					if (response.success && response.data) {
						const uploadedFiles = response.data.sucessful_uploads || [];

						let uploadedIndex = 0;
						this.currentPhotos = this.currentPhotos.map((photo) => {
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
							.filter((p) => p !== null)
							.map((p) => ({ id: p!.id, src: p!.src }));

						this.renderPhotos();
						this.updateSubmitButton();

						const notification = new Notification({
							title: `Сохранено ${uploadedFiles.length} фотографий`,
							isWarning: false,
							isWithButton: true,
						});
						notification.render();

						if (this.currentPhotos[0]?.src !== store.getState('ava')) {
							store.setState('ava', this.currentPhotos[0]?.src);
						}
					} else {
						this.showErrorState('Ошибка загрузки профиля', () => this.render());
						const notification = new Notification({
							headTitle: 'Что-то пошло не так...',
							title: 'Ошибка при сохранении фотографий',
							isWarning: false,
							isWithButton: true,
						});
						notification.render();
					}
				} catch (error) {
					this.showErrorState('Ошибка соединения', () => this.render());
					const notification = new Notification({
						headTitle: 'Что-то пошло не так...',
						title: 'Ошибка при сохранении фотографий',
						isWarning: false,
						isWithButton: true,
					});
					notification.render();
				}
			});
		}
	}

	private async updateTemplate(data: any): Promise<void> {
		const userId = store.getState('myID');
		const response = await api.getProfile(userId as number);
		const dataResponse = response.data;
		if (dataResponse?.Premium.Status)
			DEFAULT_PARAMS_PROFILE_INFO.maxPhotos = 6;
		else
			DEFAULT_PARAMS_PROFILE_INFO.maxPhotos = 2;


		const { year, month, day } = parseBirthday(data.birthday) || {};
		const currentYear = new Date().getFullYear();
		const formattedBirthday = (day && month && year)
			? `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${currentYear - year}`
			: 'Не указан';

		if (data.photos && data.photos.length > 0) {
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
				{ title: 'Локация', content: data.location.split('@').join(', ') || 'Не указан' },
				{ title: 'Гендер', content: data.isMale ? 'Мужчина' : 'Женщина' },
				{ title: 'Дата рождения', content: formattedBirthday },
			],
			isLoading: false,
			isError: false,
			photos: this.currentPhotos
		};

		this.isMale = data.isMale;

		this.replaceContent(templateHBS(templateParams));
		this.attachListeners();
		this.setupPhotoHandlers();
	}

	private updateSubmitButton(): void {
		const submitBtn = this.parentElement.querySelector('.uploadPhotos__submitBtn') as HTMLButtonElement;
		if (!submitBtn) { return; }

		const hasNewPhotos = this.currentPhotos.some((p) => p?.isNew);
		submitBtn.disabled = !hasNewPhotos;
	}

	private renderPhotos(): void {
		const photosGrid = this.parentElement.querySelector('#photosGridId');
		if (!photosGrid) { return; }

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
		const self = this;

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
				await this.updateTemplate(response.data);
			} else {
				this.showErrorState('Ошибка загрузки профиля', () => this.render());
			}
		} catch (error) {
			this.showErrorState('Ошибка соединения', () => this.render());
		}

		document.querySelectorAll<HTMLButtonElement>('.editBtn').forEach((btn) => {
			btn.addEventListener('click', function () {
				let type: string;
				console.log(this.classList, 'Я ТУТЫ');
				if (this.classList.contains('editBtn--name')) {
					type = 'name';
				} else if (this.classList.contains('editBtn--about')) {
					type = 'about';
				} else if (this.classList.contains('editBtn--data')) {
					type = 'data';
				} else if (this.classList.contains('editBtn--interests')) {
					type = 'interests';
				} else {
					return;
				}

				this.style.display = 'none';
				const editControl = document.querySelector(`.editControls--${type}`);
				if (editControl) {
					editControl.style.display = 'flex';
				}

				if (type === 'name') {
					const firstName = document.querySelector('.firstInfo__firstName')?.textContent || '';
					const lastName = document.querySelector('.firstInfo__lastName')?.textContent || '';
					const age = document.querySelector('.firstInfo__age')?.textContent || '';

					const content = document.querySelector('.firstInfo__content');
					if (content) {
						content.setAttribute('data-original-firstName', firstName);
						content.setAttribute('data-original-lastName', lastName);
						content.setAttribute('data-original-age', age);

						content.innerHTML = `
						<input type="text" class="nameInput" value="${firstName.trim()}" placeholder="Имя">
						<input type="text" class="nameInput" value="${lastName.trim()}" placeholder="Фамилия">
						<span class="firstInfo__age">${age}</span>
					`;
					}
				} else if (type === 'about') {
					const aboutText = document.querySelector('.aboutMe__text')?.textContent || '';
					const editInput = document.querySelector('.aboutMe__editInput');
					const content = document.querySelector('.aboutMe__content');
					if (editInput && content) {
						content.style.display = 'none';
						editInput.style.display = 'block';
						editInput.value = aboutText;
					}
				} else if (type === 'data') {
					document.querySelectorAll('.personData__content').forEach((content) => {
						content.style.display = 'none';
						const next = content.nextElementSibling as HTMLElement;
						next.style.display = 'block';
					});
				} else if (type === 'interests') {
					const interestsContainer = document.querySelector('.interests__container') as HTMLElement;
					const editContainer = document.querySelector('.interests__editContainer') as HTMLElement;
					const editItemsContainer = document.querySelector('.interests__editItems') as HTMLElement;

					interestsContainer.style.display = 'none';
					editContainer.style.display = 'flex';

					editItemsContainer.innerHTML = '';
					Array.from(interestsContainer.querySelectorAll('.interests__item')).forEach((item) => {
						addInterestInput(item.textContent || '');
					});
				}
			});
		});

		function addInterestInput(value: string = '') {
			const editItemsContainer = document.querySelector('.interests__editItems') as HTMLElement;
			const item = document.createElement('div');
			item.className = 'interests__editItem';

			item.innerHTML = `
			  <input placeholder="Впиши интерес" type="text" class="interests__editInput" value="${value}">
			  <button type="button" class="interests__removeBtn"></button>
			`;

			editItemsContainer.appendChild(item);

			const input = item.querySelector('.interests__editInput') as HTMLInputElement;
			input.focus();

			item.querySelector('.interests__removeBtn')?.addEventListener('click', () => {
				item.remove();
			});
		}

		document.querySelector('.interests__addBtn')?.addEventListener('click', () => {
			addInterestInput();
		});

		document.querySelectorAll<HTMLButtonElement>('.saveBtn').forEach((btn) => {
			const { isMale } = this;
			btn.addEventListener('click', async function () {
				let type: string;
				const controls = this.closest('.editControls');

				if (controls?.classList.contains('editControls--name')) {
					type = 'name';
				} else if (controls?.classList.contains('editControls--about')) {
					type = 'about';
				} else if (controls?.classList.contains('editControls--data')) {
					type = 'data';
				} else if (controls?.classList.contains('editControls--interests')) {
					type = 'interests';
				} else {
					return;
				}

				if (type === 'name') {
					const inputs = document.querySelectorAll('.nameInput');
					const firstName = (inputs[0] as HTMLInputElement).value.trim();
					const lastName = (inputs[1] as HTMLInputElement).value.trim();
					const age = document.querySelector('.firstInfo__age')?.textContent || '';

					try {
						const res = await api.updateProfile({
							profileId: store.getState('myID') as number,
							firstName,
							lastName
						});

						if (res.success) {
							const content = document.querySelector('.firstInfo__content');
							if (content) {
								content.innerHTML = `
								<span class="firstInfo__firstName">${firstName}</span>
								<span class="firstInfo__lastName">${lastName}</span>
								<span class="firstInfo__age">${age}</span>
								`;
							}
						} else {
							self.showErrorState('Ошибка при обновлении имени или фамилии', () => self.render());
							const notification = new Notification({
								headTitle: 'Что-то пошло не так...',
								title: 'Ошибка при обновлении имени или фамилии',
								isWarning: false,
								isWithButton: true,
							});
							notification.render();
						}
					} catch (e) {
						self.showErrorState('Сервер недоступен', () => self.render());
						const notification = new Notification({
							headTitle: 'Что-то пошло не так...',
							title: 'Сервер недоступен',
							isWarning: false,
							isWithButton: true,
						});
						notification.render();
					}
				} else if (type === 'about') {
					const newText = (document.querySelector('.aboutMe__editInput') as HTMLTextAreaElement).value.trim();

					try {
						const res = await api.updateProfile({
							profileId: store.getState('myID') as number,
							description: newText
						});

						if (res.success) {
							document.querySelector('.aboutMe__text')!.textContent = newText;

							const content = document.querySelector('.aboutMe__content');
							const editInput = document.querySelector('.aboutMe__editInput');
							if (content && editInput) {
								content.style.display = 'block';
								editInput.style.display = 'none';
							}
						} else {
							self.showErrorState('Ошибка при обновлении описания', () => self.render());
							const notification = new Notification({
								headTitle: 'Что-то пошло не так...',
								title: 'Ошибка при обновлении описания',
								isWarning: false,
								isWithButton: true,
							});
							notification.render();
						}
					} catch (e) {
						self.showErrorState('Сервер недоступен', () => self.render());
						const notification = new Notification({
							headTitle: 'Что-то пошло не так...',
							title: 'Сервер недоступен',
							isWarning: false,
							isWithButton: true,
						});
						notification.render();
					}
				} else if (type === 'data') {
					const updatedData: Record<string, string> = {};

					document.querySelectorAll('.personData__item').forEach((item) => {
						const titleElement = item.querySelector('.personData__field');
						const inputElement = item.querySelector('.personData__editInput');

						if (titleElement && inputElement) {
							const fieldName = titleElement.textContent?.trim();
							const fieldValue = (inputElement as HTMLInputElement).value.trim();

							if (fieldName) {
								updatedData[fieldName] = fieldValue;
							}
						}
					});

					if ('Рост' in updatedData) {
						const heightValidation = ProfileValidators.validateHeight(updatedData['Рост']);
						if (!heightValidation.isValid) {
							new Notification({
								headTitle: 'Ошибка валидации',
								title: heightValidation.message || 'Некорректный рост',
								isWarning: false,
								isWithButton: true,
							}).render();
							return;
						}
					}

					if ('Гендер' in updatedData) {
						const genderValidation = ProfileValidators.validateGender(updatedData['Гендер']);
						if (!genderValidation.isValid) {
							new Notification({
								headTitle: 'Ошибка валидации',
								title: genderValidation.message || 'Некорректный гендер',
								isWarning: false,
								isWithButton: true,
							}).render();
							return;
						}
					}

					if ('Дата рождения' in updatedData) {
						const birthdayValidation = ProfileValidators.validateBirthday(updatedData['Дата рождения']);
						if (!birthdayValidation.isValid) {
							new Notification({
								headTitle: 'Ошибка валидации',
								title: birthdayValidation.message || 'Некорректная дата рождения',
								isWarning: false,
								isWithButton: true,
							}).render();
							return;
						}
					}

					const apiData: any = {
						profileId: store.getState('myID') as number
					};

					if ('Гендер' in updatedData) {
						apiData.isMale = Boolean((Number(updatedData['Гендер'] === 'Мужчина') + Number(isMale)) % 2);
					}

					if ('Дата рождения' in updatedData) {
						const [day, month, year] = updatedData['Дата рождения'].split('.');
						const date = new Date(`${year}-${month}-${day}T00:00:00Z`);
						apiData.birthday = date.toISOString();
					}

					if ('Рост' in updatedData) {
						apiData.height = parseInt(updatedData['Рост'], 10);
					}

					if ('Локация' in updatedData) {
						apiData.location = updatedData['Локация'].split(', ').join('@');
					}

					try {
						const res = await api.updateProfile(apiData);

						if (res.success) {
							document.querySelectorAll('.personData__editInput').forEach((input) => {
								const newValue = (input as HTMLInputElement).value.trim();
								input.previousElementSibling!.textContent = newValue;
								input.style.display = 'none';
								(input.previousElementSibling as HTMLElement).style.display = 'block';
							});

							const ageElement = document.querySelector('.firstInfo__age');
							const personDataContent = document.querySelectorAll('.personData__content')[3]?.textContent;

							if (ageElement && personDataContent) {
								const birthday = Number(personDataContent.split('.').at(-1));
								const currentYear = new Date().getFullYear();

								if (birthday !== undefined) {
									(ageElement as HTMLElement).innerText = String(currentYear - birthday);
								}
							}

							new Notification({
								title: 'Данные успешно обновлены',
								isWarning: false,
								isWithButton: true,
							}).render();

							store.setState('isMale', apiData.isMale);
						} else {
							self.showErrorState('Ошибка при обновлении данных', () => self.render());
							const notification = new Notification({
								headTitle: 'Что-то пошло не так...',
								title: 'Ошибка при обновлении данных',
								isWarning: false,
								isWithButton: true,
							});
							notification.render();
						}
					} catch (error) {
						self.showErrorState('Сервер недоступен', () => self.render());
						const notification = new Notification({
							headTitle: 'Что-то пошло не так...',
							title: 'Сервер недоступен',
							isWarning: false,
							isWithButton: true,
						});
						notification.render();
					}
				} else if (type === 'interests') {
					const interestsContainer = document.querySelector('.interests__container') as HTMLElement;
					const editContainer = document.querySelector('.interests__editContainer') as HTMLElement;

					const newInterests = Array.from(document.querySelectorAll('.interests__editInput'))
						.map((input) => (input as HTMLInputElement).value.trim())
						.filter((interest) => interest !== '');

					try {
						const res = await api.updateProfile({
							profileId: store.getState('myID') as number,
							interests: newInterests
						});

						if (res.success) {
							interestsContainer.innerHTML = '';
							newInterests.forEach((interest) => {
								const item = document.createElement('span');
								item.className = 'interests__item';
								item.textContent = interest;
								interestsContainer.appendChild(item);
							});

							interestsContainer.style.display = 'flex';
							editContainer.style.display = 'none';
						} else {
							self.showErrorState('Ошибка при обновлении интересов', () => self.render());
							const notification = new Notification({
								headTitle: 'Что-то пошло не так...',
								title: 'Ошибка при обновлении интересов',
								isWarning: false,
								isWithButton: true,
							});
							notification.render();
						}
					} catch (e) {
						self.showErrorState('Сервер недоступен', () => self.render());
						const notification = new Notification({
							headTitle: 'Что-то пошло не так...',
							title: 'Сервер недоступен',
							isWarning: false,
							isWithButton: true,
						});
						notification.render();
					}
				}

				const editControl = document.querySelector(`.editControls--${type}`);
				const editBtn = document.querySelector(`.editBtn--${type}`);
				if (editControl && editBtn) {
					editControl.style.display = 'none';
					editBtn.style.display = 'block';
				}
			});
		});

		document.querySelectorAll<HTMLButtonElement>('.cancelBtn').forEach((btn) => {
			btn.addEventListener('click', function () {
				let type: string;
				const controls = this.closest('.editControls');

				if (controls?.classList.contains('editControls--name')) {
					type = 'name';
				} else if (controls?.classList.contains('editControls--about')) {
					type = 'about';
				} else if (controls?.classList.contains('editControls--data')) {
					type = 'data';
				} else if (controls?.classList.contains('editControls--interests')) {
					type = 'interests';
				} else {
					return;
				}

				if (type === 'name') {
					const originalFirstName = document.querySelector('.firstInfo__content')?.getAttribute('data-original-firstName') || '';
					const originalLastName = document.querySelector('.firstInfo__content')?.getAttribute('data-original-lastName') || '';
					const originalAge = document.querySelector('.firstInfo__content')?.getAttribute('data-original-age') || '';

					const content = document.querySelector('.firstInfo__content');
					if (content) {
						content.innerHTML = `
					<span class="firstInfo__firstName">${originalFirstName}</span>
					<span class="firstInfo__lastName">${originalLastName}</span>
					<span class="firstInfo__age">${originalAge}</span>
				  `;
					}
				} else if (type === 'about') {
					const content = document.querySelector('.aboutMe__content');
					const editInput = document.querySelector('.aboutMe__editInput');
					if (content && editInput) {
						content.style.display = 'block';
						editInput.style.display = 'none';
					}
				} else if (type === 'data') {
					document.querySelectorAll('.personData__editInput').forEach((input) => {
						input.style.display = 'none';
						const prev = input.previousElementSibling as HTMLElement;
						prev.style.display = 'block';
					});
				} else if (type === 'interests') {
					const interestsContainer = document.querySelector('.interests__container') as HTMLElement;
					const editContainer = document.querySelector('.interests__editContainer') as HTMLElement;

					interestsContainer.style.display = 'flex';
					editContainer.style.display = 'none';
				}

				const editControl = document.querySelector(`.editControls--${type}`);
				const editBtn = document.querySelector(`.editBtn--${type}`);
				if (editControl && editBtn) {
					editControl.style.display = 'none';
					editBtn.style.display = 'block';
				}
			});
		});

	}
}
