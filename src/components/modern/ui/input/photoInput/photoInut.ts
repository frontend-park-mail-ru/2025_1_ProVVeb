import { VBC } from '@VDOM/VBC';
import Notification from '@notification';
import Confirm from '@simple/confirm/confirm';
import api from '@network';
import store from '@store';
import templateHBS from './photoInput.hbs';

export interface photo_params {
	src: string,
	id: number,
	isNew: boolean
}

export class VPhotoInput extends VBC {
	public currentPhoto: photo_params | null = null;

	public isDeleted: string = '';

	private lastUsedId = 0;

	private generateId(): number {
		return Number(`${Date.now()}${this.lastUsedId++}`);
	}

	public async deletePhoto(src: string): Promise<boolean> {
		if (!this.currentPhoto) { return false; }
		try {
			const fullUrl = src;
			const fileName = fullUrl.split('/').pop();

			if (!fileName) {
				const notification = new Notification({
					title: 'Не удалось определить имя файла',
					isWarning: true,
					isWithButton: true,
				});
				notification.render();

				return false;
			}

			const response = await api.deletePhoto(
				store.getState('myID') as number,
				fileName
			);

			if (response.success && response.data) {
				return true;
			}
			const notification = new Notification({
				title: 'Неизвестная ошибка при удалении фотографии',
				isWarning: true,
				isWithButton: true,
			});
			notification.render();

		} catch (error) {
			const notification = new Notification({
				title: 'Не удалось удалить фотографию',
				isWarning: true,
				isWithButton: true,
			});
			notification.render();
		}
		return false;
	}

	private async handlerDelete(): Promise<void> {
		if (!this.currentPhoto) { return; }
		if (this.currentPhoto.isNew) {
			this.currentPhoto = { id: 0, src: '', isNew: false };
			this.injectProps(this.currentPhoto);
			this.update();
			return;
		}

		const confirmComponent = new Confirm({
			headTitle: 'Согласны?',
			title: 'Удалить эту фотографию?',
			isWarning: true,
		});
		const confirm = await confirmComponent.render();
		if (!confirm) { return; }

		this.isDeleted = this.currentPhoto.src;
		this.currentPhoto = { id: 0, src: '', isNew: false };
		this.injectProps(this.currentPhoto);
		this.update();
	}

	public applyHandler(): void {
		this.injectScript('.photo-card__delete', 'click', this.handlerDelete.bind(this));
		this.update();
	}

	constructor() {
		super(templateHBS);

		this.injectScript('.photo-card__input', 'change', (e) => {
			const fileInput = e.target as HTMLInputElement;

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
						const notification = new Notification({
							headTitle: 'Важное сообщение',
							title: 'Ошибка чтения файла при загрузке',
							isWarning: false,
							isWithButton: true,
						});
						notification.render();
						return;
					}

					this.currentPhoto = {
						id: this.generateId(),
						src: event.target.result as string,
						isNew: true
					};
					super.injectProps(this.currentPhoto);
					this.applyHandler();
				};

				reader.onerror = () => {
					const notification = new Notification({
						headTitle: 'Важное сообщение',
						title: 'Ошибка при чтении файла',
						isWarning: false,
						isWithButton: true,
					});
					notification.render();
				};

				reader.readAsDataURL(file);
			}
		});
	}
}
