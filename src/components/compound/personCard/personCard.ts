import BaseComponent from '../../BaseComponent';
import templateHBS from './personCard.hbs';

interface PersonCardParams {
	srcPersonPictureError: string;
	srcPersonPicture: string;
	personName: string;
	personAge: number;
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
	personName: 'Имя',
	personAge: 16,
	personDescription: 'Краткое описание человека...',
};

export default class PersonCard extends BaseComponent {
	private callbacks: Callback[];

	constructor(parentElement: HTMLElement, paramsHBS: Partial<PersonCardParams> = {}, callbacks: Callback[] = []) {
		const finalParamsHBS = { ...DEFAULT_PARAMS_PERSON_CARD, ...paramsHBS };
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
