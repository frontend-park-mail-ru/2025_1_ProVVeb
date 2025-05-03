import { Compounder } from "@modules/VDOM/Compounder";
import { VBC } from "@modules/VDOM/VBC";
import Notification from "@simple/notification/notification";
import store from "@store";
import { photo_params, VPhotoInput } from "@VDOM/simple/input/photoInput/photoInut";
import api from "@network";

export class CReg100 extends VBC {
    private components: VPhotoInput[] = [];
    private photos: photo_params[] = Array(6).fill(null);
    private lastUsedId: number = 0;

    private generateId(): number {
		return Number(`${Date.now()}${this.lastUsedId++}`);
	}

    private renderPhotos(){
        for(let i=0;i<6;i++){
            if(this.photos[i]){
                console.log(this.components[i]);
                this.components[i].injectProps(this.photos[i]);
                this.components[i].handlerDelete();
            }
        }
    }

    private async updateData(): Promise<void>{
        try {
			const userId = store.getState('myID');
			if (userId === undefined) {
				new Notification({
                    title: "Ошибка заполнения профиля. Аккаунта не существует",
                    isWarning: true,
                    isWithButton: true
                }).render();
				return;
			}

			const response = await api.getProfile(userId as number);

			if (response.success && response.data) {
                this.photos = [];
				for(let el of response.data.photos){
                    this.photos.push({
                        id: this.generateId(),
                        src: api.BASE_URL_PHOTO + el,
                        isNew: false
                    });
                }
                const empty = Array( 6-response.data.photos.length ).fill(null);
                for(let el of empty)
                    this.photos.push(el);
                this.renderPhotos();
			} else {
				new Notification({
                    title: "Ошибка сети. Профиль не загружен",
                    isWarning: true,
                    isWithButton: true
                }).render();
			}
		} catch (error) {
			new Notification({
                title: "Ошибка сети",
                isWarning: true,
                isWithButton: true
            }).render();
		}
    }

    constructor() {
        const main = new Compounder();
        const photos: photo_params[] = Array(6).fill(null);

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

        photos.forEach(()=>{
            const photo = new VPhotoInput();
            this.components.push(photo);
            main.add(photo);
        });
        this.photos = photos;

        this.updateData();
    }
}