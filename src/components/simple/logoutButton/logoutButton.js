import Button from "../../pattern/button/button.js";

const DEFAULT_LOGOUT_PARAMS_BUTTON = {
	idButton: 'logoutButton',
	buttonText: 'Выйти',
};

DEFAULT_LOGOUT_PARAMS_BUTTON.listenButton = {
	eventType: 'click',
	selector: `#${DEFAULT_LOGOUT_PARAMS_BUTTON.idButton}`,
	callback: () => {
		console.log("ВЫЙТИ из сессии");
	},
};

export default class LogoutButton extends Button {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = { ...DEFAULT_LOGOUT_PARAMS_BUTTON, ...paramsHBS };
		super(parentElement, finalParamsHBS);
	}
}