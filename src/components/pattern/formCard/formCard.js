import BaseComponent from '../../BaseComponent.js';

const DEFAULT_PARAMS_FORM_CARD = {
	progressBar: '',
	linkToPage: '',
	cardTitle: 'Заголовок',
	fields: [],
	button: '',
};

export default class FormCard extends BaseComponent {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = Object.assign({}, DEFAULT_PARAMS_FORM_CARD, paramsHBS);
		const templateHBS = Handlebars.templates['formCard.hbs'];
		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);
	}
}
