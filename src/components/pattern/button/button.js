import BaseComponent from "../../BaseComponent.js";

const DEFAULT_PARAMS_BUTTON = {
	buttonText: 'Кнопка',
}

export default class Button extends BaseComponent {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = Object.assign({}, DEFAULT_PARAMS_BUTTON, paramsHBS);
		const templateHBS = Handlebars.templates['button.hbs'];
		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);
	}
}