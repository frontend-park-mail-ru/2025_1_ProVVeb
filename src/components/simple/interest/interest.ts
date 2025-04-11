import BaseComponent from '@basecomp';
import templateHBS from './interest.hbs';

interface InterestParams {
	title: string;
}

const DEFAULT_PARAMS_INTEREST: InterestParams = {
	title: 'Some text'
};

export default class Profile extends BaseComponent {
	constructor(parentElement: HTMLElement, paramsHBS: Partial<InterestParams> = {}) {
		const finalParamsHBS = { ...DEFAULT_PARAMS_INTEREST, ...paramsHBS };
		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);
	}
}