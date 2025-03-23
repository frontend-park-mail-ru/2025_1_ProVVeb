import BaseComponent from '../../BaseComponent.js';
import templateHBS from './formCard.hbs';

const DEFAULT_PARAMS_FORM_CARD = {
	progressBar: '',
	linkToPage: '',
	cardTitle: 'Заголовок',
	fields: [],
	button: '',
};

export default class FormCard extends BaseComponent {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = { ...DEFAULT_PARAMS_FORM_CARD, ...paramsHBS };
		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);
	}
}
