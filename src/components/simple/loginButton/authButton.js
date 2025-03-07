import Button from "../../pattern/button/button.js";

const LOGIN_PARAMS_BUTTON = {
	buttonText: 'Продолжить',
}

export default class LoginButton extends Button {
	constructor(parentElement) {
		super(parentElement, LOGIN_PARAMS_BUTTON);
	}
}