import BaseComponent from '@basecomp';
import templateHBS from './header.hbs';

interface HeaderParams {
	isGreeting: boolean;
	logotype: string;
	profile: string;
	// logoutSessionBtn: string;
	dotsMenu: string;
}

const DEFAULT_COMPONENTS: HeaderParams = {
	isGreeting: false,
	logotype: '',
	profile: '',
	dotsMenu: '',
};

export default class Header extends BaseComponent {
	constructor(parentElement: HTMLElement, paramsHBS: Partial<HeaderParams> = {}) {
		const finalParamsHBS = { ...DEFAULT_COMPONENTS, ...paramsHBS };

		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);
	}
}
