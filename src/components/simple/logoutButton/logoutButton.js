import Button from "../../pattern/button/button.js";
import api from "../../../modules/network.js"
import router from '../../../modules/router.js';

const DEFAULT_LOGOUT_PARAMS_BUTTON = {
	idButton: 'logoutButton',
	buttonText: 'Выйти',
};

DEFAULT_LOGOUT_PARAMS_BUTTON.listenButton = {
	eventType: 'click',
	selector: `#${DEFAULT_LOGOUT_PARAMS_BUTTON.idButton}`,
	callback: () => {
		// console.log("ВЫЙТИ из сессии");
		api.logoutUser()
			.then(response => {
				console.log('Выход выполнен успешно:', response);
				router.navigateTo('auth');
			})
			.catch(error => {
				console.error('Ошибка при выходе:', error);
			});
	},
};

export default class LogoutButton extends Button {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = { ...DEFAULT_LOGOUT_PARAMS_BUTTON, ...paramsHBS };
		super(parentElement, finalParamsHBS);
	}
}