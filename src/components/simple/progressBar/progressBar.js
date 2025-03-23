import BaseComponent from '../../BaseComponent.js';
import templateHBS from './progressBar.hbs';

const DEFAULT_PARAMS_PROGRESS_BAR = {
	progressPercent: 0,
};
export default class ProgressBar extends BaseComponent {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = { ...DEFAULT_PARAMS_PROGRESS_BAR, ...paramsHBS };
		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);
	}
}
