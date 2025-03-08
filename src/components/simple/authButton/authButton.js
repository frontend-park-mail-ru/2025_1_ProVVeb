import Button from "../../pattern/button/button.js";

const DEFAULT_AUTH_PARAMS_BUTTON = {
	buttonText: 'Войти',
}

export default class AuthButton extends Button {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = Object.assign({}, DEFAULT_AUTH_PARAMS_BUTTON, paramsHBS);
		super(parentElement, finalParamsHBS);
	}
}