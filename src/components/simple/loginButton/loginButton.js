import Button from "../../pattern/button/button.js";

const DEFAULT_LOGIN_PARAMS_BUTTON = {
	buttonText: 'Продолжить',
}

export default class LoginButton extends Button {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = Object.assign({}, DEFAULT_LOGIN_PARAMS_BUTTON, paramsHBS);
		super(parentElement, finalParamsHBS);
	}
}