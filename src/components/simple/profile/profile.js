import BaseComponent from '../../BaseComponent.js';
import store from '../../Store.js';
import templateHBS from './profile.hbs';

const DEFAULT_PARAMS_PROGRESS_BAR = {
	profile_name: 'Имя человека',
	path: 'media/logo/Icon 50.png',
};
export default class Profile extends BaseComponent {
	constructor(parentElement, paramsHBS = DEFAULT_PARAMS_PROGRESS_BAR) {
		
		store.subscribe("profile_name", (newName)=>{
			document.querySelector(".profile").children[0].innerHTML=newName;
		});

		const templateHTML = templateHBS(paramsHBS);
		super(templateHTML, parentElement);
	}
}
