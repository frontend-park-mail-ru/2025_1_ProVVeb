import BaseComponent from "../../BaseComponent.js";
import BaseComponent from "../logo.js";

const DEFAULT_PARAMS_BUTTON = {
	buttonText: 'КНОПКА',
}

export default class Button extends BaseComponent {
	constructor(parentElement, paramsHBS = DEFAULT_PARAMS_BUTTON) {
		const templateHBS = Handlebars.templates['header.hbs'];
		const templateHTML = templateHBS(paramsHBS);
		super(templateHTML, parentElement);
	}
}