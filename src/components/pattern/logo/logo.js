import BaseComponent from "../../BaseComponent.js";

const DEFAULT_PARAMS_BUTTON = {
	type: "white",
	png_name: "Icon 50.png",
}

export default class Logo extends BaseComponent {
	constructor(parentElement, paramsHBS = DEFAULT_PARAMS_BUTTON) {
		const templateHBS = Handlebars.templates['logo.hbs'];
		const templateHTML = templateHBS(paramsHBS);
		super(templateHTML, parentElement);
	}
}