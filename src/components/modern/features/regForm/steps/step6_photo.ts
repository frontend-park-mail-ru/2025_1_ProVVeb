import { Compounder } from '@VDOM/Compounder';
import { VBC } from '@VDOM/VBC';
import Notification from '@notification';
import store from '@store';
import { photo_params, VPhotoInput } from '@ui/input/photoInput/photoInut';
import api from '@network';

const max_photo = 6;

export class CReg100 extends VBC {
	private components: VPhotoInput[] = [];

	private photos: photo_params[] = Array(max_photo).fill(null);

	private lastUsedId: number = 0;

	private n: number = 0;

	private generateId(): number {
		return Number(`${Date.now()}${this.lastUsedId++}`);
	}

	public renderPhotos() {
		for (let i = 0; i < max_photo; i++) {
			if (this.photos[i]) {
				this.components[i].forceUpdate();
				this.components[i].currentPhoto = this.photos[i];
				this.components[i].injectProps(this.photos[i]);
				this.components[i].applyHandler();
			}
		}
	}

	private async saveFiles(newPhotos: any): Promise<boolean> {
		try {
			const response = await api.uploadPhotos(store.getState('myID') as number, newPhotos);

			if (response.success && response.data) {
				const uploadedFiles = response.data.uploaded_files || [];

				new Notification({
					headTitle: 'Успех!',
					title: `Сохранено ${uploadedFiles.length} фотографий`,
					isWarning: true,
					isWithButton: true,
				}).render();

				store.setState('ava', this.photos[0]?.src);
				return true;
			}
			new Notification({
				headTitle: 'Что-то пошло не так...',
				title: 'Ошибка при сохранении фотографий',
				isWarning: false,
				isWithButton: true,
			}).render();

		} catch (error) {
			console.error('Ошибка при загрузке фотографий:', error);
			new Notification({
				headTitle: 'Что-то пошло не так...',
				title: 'Ошибка при сохранении фотографий',
				isWarning: false,
				isWithButton: true,
			}).render();
		}
		return false;
	}

	public async uploadFiles(): Promise<boolean> {
		let flag: boolean = true;

		const save = [];
		const del = [];
		for (const el of this.components) {
			if (!el) { continue; }
			if (el.currentPhoto?.id != 0 && el.currentPhoto?.src && el.currentPhoto.isNew) { save.push(el.currentPhoto); }
			if (el.isDeleted != '') { del.push(el); }
		}

		if (this.n + save.length <= del.length) {
			new Notification({
				headTitle: 'Что-то пошло не так...',
				title: 'В профиле должна быть хотя бы одна фотография',
				isWarning: true,
				isWithButton: true,
			}).render();

			for (const el of del) { el.isDeleted = ''; }

			return false;
		}

		if (save.length > 0) { flag = flag && (await this.saveFiles(save)); }

		for (const el of del) { flag = flag && (await el.deletePhoto(el.isDeleted)); }

		return flag;
	}

	public async updateData(): Promise<boolean> {
		try {
			const userId = store.getState('myID');
			if (userId === undefined) {
				return false;
			}

			const response = await api.getProfile(userId as number);

			if (response.success && response.data) {
				this.photos = [];
				for (const el of response.data.photos) {
					this.photos.push({
						id: this.generateId(),
						src: api.BASE_URL_PHOTO + el,
						isNew: false
					});
				}
				this.n = response.data.photos.length;
				const empty = Array(max_photo - response.data.photos.length).fill(null);
				for (const el of empty) { this.photos.push(el); }
				this.renderPhotos();
			} else {
				new Notification({
					title: 'Ошибка сети. Профиль не загружен',
					isWarning: true,
					isWithButton: true
				}).render();
				return false;
			}
		} catch (error) {
			new Notification({
				title: 'Ошибка сети',
				isWarning: true,
				isWithButton: true
			}).render();
			return false;
		}
		return true;
	}

	constructor() {
		const main = new Compounder();
		const photos: photo_params[] = Array(max_photo).fill(null);

		main.down('photo-grid', `
            display: grid;
            grid-template-columns: repeat(3, 150px);
            grid-template-rows: repeat(2, 130px);
            justify-items: center;
            align-items: center;
        `);

		super(main.getTemplate());
		this.vdom = main.getVDOM();
		this.setID();

		photos.forEach(() => {
			const photo = new VPhotoInput();
			this.components.push(photo);
			main.add(photo);
		});
		this.photos = photos;

		this.updateData();
	}
}
