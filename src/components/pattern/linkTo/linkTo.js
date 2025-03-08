import BaseComponent from "../../BaseComponent.js";

const DEFAULT_PARAMS_LINK = {
	linkText: 'Ссылка',
};

export default class LinkTo extends BaseComponent {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = Object.assign({}, DEFAULT_PARAMS_LINK, paramsHBS);
		const templateHBS = Handlebars.templates['linkTo.hbs'];
		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);
	}
}