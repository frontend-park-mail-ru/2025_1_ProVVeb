import BaseComponent from '../../BaseComponent.js';

const DEFAULT_PARAMS_PROGRESS_BAR = {
	profile_name: 'Имя человека',
	path: '../../../media/logo/Icon 50.png',
};
export default class Profile extends BaseComponent {
	constructor(parentElement, paramsHBS = DEFAULT_PARAMS_PROGRESS_BAR) {
		const templateHBS = Handlebars.templates['profile.hbs'];
		const templateHTML = templateHBS(paramsHBS);
		super(templateHTML, parentElement);
	}
}
