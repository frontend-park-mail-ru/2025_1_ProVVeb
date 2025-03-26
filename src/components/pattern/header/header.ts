import BaseComponent from '../../BaseComponent';
import templateHBS from './header.hbs';

interface HeaderParams {
	logotype: string;
	profile: string;
	isGreeting: boolean;
	logoutSessionBtn?: string;
}

const DEFAULT_COMPONENTS: HeaderParams = {
	logotype: '',
	profile: '',
	isGreeting: false,
};

export default class Header extends BaseComponent {
	constructor(parentElement: HTMLElement, paramsHBS: Partial<HeaderParams> = {}) {
		const finalParamsHBS = { ...DEFAULT_COMPONENTS, ...paramsHBS };

		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);
	}
}
