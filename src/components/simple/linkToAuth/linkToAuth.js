import LinkTo from "../../pattern/linkTo/linkTo.js";

const DEFAULT_LINK_TO_AUTH_PARAMS_BUTTON = {
	linkText: 'Уже есть аккаунт? Войти',
}

export default class LinkToLogin extends LinkTo {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = Object.assign({}, DEFAULT_LINK_TO_AUTH_PARAMS_BUTTON, paramsHBS);
		super(parentElement, finalParamsHBS);
	}
}