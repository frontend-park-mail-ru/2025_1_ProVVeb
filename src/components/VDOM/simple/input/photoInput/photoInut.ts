import { VBC } from '@modules/VDOM/VBC';
import templateHBS from './photoInput.hbs';
import Notification from '@simple/notification/notification';
import Confirm from '@simple/confirm/confirm';
import api from '@network';
import store from '@store';

export interface photo_params {
    src: string,
    id: number,
    isNew: boolean
}

export class VPhotoInput extends VBC {
    private currentPhoto: photo_params | null = null;
    private lastUsedId = 0;

    private generateId(): number {
		return Number(`${Date.now()}${this.lastUsedId++}`);
	}

    public handlerDelete(): void {
        this.injectScript(".photo-card__delete", "click", async ()=>{
            if(!this.currentPhoto)return;
            if (this.currentPhoto.isNew) {
                this.currentPhoto = {id: 0, src: '', isNew: false};
                this.injectProps(this.currentPhoto);
                this.update();
                return;
            }
                
            const confirmComponent = new Confirm({
                headTitle: 'Согласны?',
                title: 'Удалить эту фотографию с сервера?',
                isWarning: false,
            });
            const confirm = await confirmComponent.render();
            if (!confirm) return;
    
            try {
                const fullUrl = this.currentPhoto.src;
                const fileName = fullUrl.split('/').pop();
    
                if (!fileName) {
                    const notification = new Notification({
                        headTitle: "Что-то пошло не так...",
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
                    this.currentPhoto = {id: 0, src: '', isNew: false};
                    this.injectProps(this.currentPhoto);
                    this.update();
                } else {
                    const notification = new Notification({
                        headTitle: "Что-то пошло не так...",
                        title: 'Неизвестная ошибка при удалении фотографии',
                        isWarning: false,
                        isWithButton: true,
                    });
                    notification.render();
                }
            } catch (error) {
                console.error('Ошибка при удалении фотографии:', error);

                const notification = new Notification({
                    headTitle: "Что-то пошло не так...",
                    title: 'Не удалось удалить фотографию',
                    isWarning: false,
                    isWithButton: true,
                });
                notification.render();
    
            }
        });
        this.update();
    }

    constructor(){
        super(templateHBS);

        this.injectScript('.photo-card__input', 'change', (e)=>{
            const fileInput = e.target as HTMLInputElement;

            if (fileInput.files && fileInput.files[0]) {
				const file = fileInput.files[0];
				if (!file.type.match('image.*')) {

					const notification = new Notification({
						headTitle: "Важное сообщение",
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

					this.currentPhoto = {
						id: this.generateId(),
						src: event.target.result as string,
						isNew: true
					};
                    console.log(this.vdom);
                    this.injectProps(this.currentPhoto);
                    this.handlerDelete();
                    console.log(this.vdom);
                    this.update();
				};

				reader.onerror = () => {
					console.error('Ошибка при чтении файла');
				};

				reader.readAsDataURL(file);
			}
        });
    }
}