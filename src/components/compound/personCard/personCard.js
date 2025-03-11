import BaseComponent from '../../BaseComponent.js';

const DEFAULT_PARAMS_PERSON_CARD = {
	srcPersonPictureError: 'media/error/400x600.jpg',
	srcPersonPicture: '',
	personName: 'Имя',
	personAge: 16,
	personDescription: 'Краткое описание человека...',
};

export default class PersonCard extends BaseComponent {
	constructor(parentElement, paramsHBS = {}, callbacks = []) {
		const finalParamsHBS = { ...DEFAULT_PARAMS_PERSON_CARD, ...paramsHBS };
		const templateHBS = Handlebars.templates['personCard.hbs'];
		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);

		this.callbacks = callbacks;
	}

	render() {
		super.render();
		this.callbacks.forEach((callback) => {
			this.addListener(callback.event, callback.selector, callback.callback);
		});
		this.attachListeners();
	}
}
