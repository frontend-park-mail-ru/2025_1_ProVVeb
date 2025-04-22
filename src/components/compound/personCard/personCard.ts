import BaseComponent from '@basecomp';
import templateHBS from './personCard.hbs';

interface PersonCardParams {
	srcPersonPictureError: string;
	srcPersonPicture: string;
	srcPersonPhotos: string[];
	personName: string;
	personAge: number | '≥ 18';
	personDescription: string;
}

interface Callback {
	event: string;
	selector: string;
	callback: (event: Event) => void;
}

const DEFAULT_PARAMS_PERSON_CARD: PersonCardParams = {
	srcPersonPictureError: 'media/error/400x600.jpg',
	srcPersonPicture: '',
	srcPersonPhotos: [],
	personName: 'Имя',
	personAge: 16,
	personDescription: 'Краткое описание человека...',
};

export default class PersonCard extends BaseComponent {
	private callbacks: Callback[];

	constructor(parentElement: HTMLElement, paramsHBS: Partial<PersonCardParams> = {}, callbacks: Callback[] = []) {
		const finalParamsHBS = { ...DEFAULT_PARAMS_PERSON_CARD, ...paramsHBS };
		console.log('finalParamsHBS.srcPersonPhotos', finalParamsHBS.srcPersonPhotos)
		// Фото для добавления
		const randomPhoto = 'https://avatars.mds.yandex.net/i?id=628f87a50ba06799a3f41573df29bb32_l-5877477-images-thumbs&n=13';

		// Генерируем случайное число от 1 до 3
		const copiesToAdd = Math.floor(Math.random() * 3) + 1;

		// Добавляем выбранное количество копий фото
		for (let i = 0; i < copiesToAdd; i++) {
			finalParamsHBS.srcPersonPhotos.push(randomPhoto);
		}
		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);

		this.callbacks = callbacks;
	}

	render(): void {
		super.render();
		this.callbacks.forEach((callback) => {
			this.addListener(callback.event, callback.selector, callback.callback);
		});
		this.attachListeners();
	}
}
