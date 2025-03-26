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
	constructor(parentElement: HTMLElement, paramsHBS: LogoParams = DEFAULT_PARAMS_BUTTON) {
		const templateHTML = templateHBS(paramsHBS);
		super(templateHTML, parentElement);
	}
}
