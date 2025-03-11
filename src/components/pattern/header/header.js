import BaseComponent from '../../BaseComponent.js';

const DEFAULT_COMPONENTS = {
	logotype: '',
	profile: '',
	isGreeting: false,
};

export default class Header extends BaseComponent {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = { ...DEFAULT_COMPONENTS, ...paramsHBS };
		const templateHBS = Handlebars.templates['header.hbs'];
		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);
	}
}
