import BaseComponent from "../../BaseComponent.js";

const DEFAULT_PARAMS_CARD = {
	progressBar: '',
	linkToPage: '',
	cardTitle: 'Заголовок',
	fields: [],
	button: '',
};

export default class Card extends BaseComponent {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = Object.assign({}, DEFAULT_PARAMS_CARD, paramsHBS);
		const templateHBS = Handlebars.templates['card.hbs'];
		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);
	}
}