import BaseComponent from "../../BaseComponent.js";

const DEFAULT_PARAMS_PROGRESS_BAR = {
	progressPercent: 0,
}
export default class ProgressBar extends BaseComponent {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = Object.assign({}, DEFAULT_PARAMS_PROGRESS_BAR, paramsHBS);
		const templateHBS = Handlebars.templates['progressBar.hbs'];
		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);
	}
}