import BaseComponent from '../../BaseComponent.js';
import templateHBS from './header.hbs';

const DEFAULT_COMPONENTS = {
	logotype: '',
	profile: '',
	isGreeting: false,
};

export default class Header extends BaseComponent {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = { ...DEFAULT_COMPONENTS, ...paramsHBS };
		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);
	}
}
