import BaseComponent from '../../BaseComponent';
import templateHBS from './logo.hbs';

export interface LogoParams {
	type: string;
	logoSrc: string;
}

const DEFAULT_PARAMS_BUTTON: LogoParams = {
	type: 'white',
	logoSrc: 'media/logo/logoSecondary.png',
};

export default class Logo extends BaseComponent {
	constructor(parentElement: HTMLElement, paramsHBS: Partial<LogoParams> = {}) {
		const finalParamsHBS = { ...DEFAULT_PARAMS_BUTTON, ...paramsHBS };

		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);
	}
}
