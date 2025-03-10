import BaseComponent from '../../BaseComponent.js';
import store from '../../Store.js';

const DEFAULT_PARAMS_PROGRESS_BAR = {
	profile_name: 'Имя человека',
	path: '../../../media/logo/Icon 50.png',
};
export default class Profile extends BaseComponent {
	constructor(parentElement, paramsHBS = DEFAULT_PARAMS_PROGRESS_BAR) {
		const templateHBS = Handlebars.templates['profile.hbs'];

		// const profile_name = store.getState("profile_name");
		// console.log(profile_name)
		// if(profile_name!=undefined){
		// 	paramsHBS.profile_name = profile_name;
		// }

		const templateHTML = templateHBS(paramsHBS);
		super(templateHTML, parentElement);
	}
}
