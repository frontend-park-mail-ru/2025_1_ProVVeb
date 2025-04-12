import BaseComponent from '@basecomp';
import templateHBS from './matchCard.hbs';

interface MatchCardParams {
	srcPersonPictureError: string;
	srcPersonPicture: string;
	personName: string;
	personAge: number;
	personDescription: string;
    personInterests: string[];
	id: number;
}

interface Callback {
	event: string;
	selector: string;
	callback: (event: Event) => void;
}

const DEFAULT_PARAMS_MATCH_CARD: MatchCardParams = {
	srcPersonPictureError: 'media/error/400x600.jpg',
	srcPersonPicture: '',
	personName: 'Имя',
	personAge: 16,
	personDescription: 'Краткое описание человека',
    personInterests: [],
	id: 0,
};

export default class PersonCard extends BaseComponent {
	private callbacks: Callback[];

	constructor(parentElement: HTMLElement, paramsHBS: Partial<MatchCardParams> = {}, callbacks: Callback[] = []) {
		const finalParamsHBS = { ...DEFAULT_PARAMS_MATCH_CARD, ...paramsHBS };
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
