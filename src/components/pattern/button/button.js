import BaseComponent from "../../BaseComponent.js";

const DEFAULT_PARAMS_BUTTON = {
	buttonText: 'КНОПКА',
}

export default class Button extends BaseComponent {
	constructor(parentElement, paramsHBS = DEFAULT_PARAMS_BUTTON) {
		const templateHBS = Handlebars.templates['button.hbs'];
		const templateHTML = templateHBS(paramsHBS);
		super(templateHTML, parentElement);
	}
}