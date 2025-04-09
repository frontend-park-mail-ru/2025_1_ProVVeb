import BaseComponent from '@basecomp';
import templateHBS from './profileInfo.hbs';

interface ProfileInfoParams {
	srcPersonPictureError: string;
	srcPersonPicture: string;
	personName: string;
	personAge: number;
	personDescription: string;
}

const DEFAULT_PARAMS_PROFILE_INFO: ProfileInfoParams = {
	srcPersonPictureError: 'media/error/400x600.jpg',
	srcPersonPicture: '',
	personName: 'Имя',
	personAge: 16,
	personDescription: 'Краткое описание человека...',
};

interface Callback {
	event: string;
	selector: string;
	callback: (event: Event) => void;
}

export default class PersonCard extends BaseComponent {
	private callbacks: Callback[];

	constructor(parentElement: HTMLElement, paramsHBS: Partial<ProfileInfoParams> = {}, callbacks: Callback[] = []) {
		const finalParamsHBS = { ...DEFAULT_PARAMS_PROFILE_INFO, ...paramsHBS };
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
