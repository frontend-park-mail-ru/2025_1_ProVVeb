import BaseComponent from "../../BaseComponent.js";

const DEFAULT_PARAMS_PROGRESS_BAR = {
	progressPercent: 0,
}
export default class ProgressBar extends BaseComponent {
	constructor(parentElement, paramsHBS = DEFAULT_PARAMS_PROGRESS_BAR) {
		const templateHBS = Handlebars.templates['progressBar.hbs'];
		const templateHTML = templateHBS(paramsHBS);
		super(templateHTML, parentElement);
	}
}