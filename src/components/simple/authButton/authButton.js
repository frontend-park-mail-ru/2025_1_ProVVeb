import Button from "../../pattern/button/button.js";

const AUTH_PARAMS_BUTTON = {
	buttonText: 'Войти',
}

export default class AuthButton extends Button {
	constructor(parentElement) {
		super(parentElement, AUTH_PARAMS_BUTTON);
	}
}