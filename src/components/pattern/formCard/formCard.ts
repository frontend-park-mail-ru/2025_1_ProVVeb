import BaseComponent from '@basecomp';
import templateHBS from './formCard.hbs';

interface FormCardParams {
	progressBar: string;
	linkToPage: string;
	cardTitle: string;
	fields: any[];
	button: string;
}

const DEFAULT_PARAMS_FORM_CARD: FormCardParams = {
	progressBar: '',
	linkToPage: '',
	cardTitle: 'Заголовок',
	fields: [],
	button: '',
};

export default class FormCard extends BaseComponent {
	constructor(parentElement: HTMLElement, paramsHBS: Partial<FormCardParams> = {}) {
		const finalParamsHBS = { ...DEFAULT_PARAMS_FORM_CARD, ...paramsHBS };

		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);
	}
}
