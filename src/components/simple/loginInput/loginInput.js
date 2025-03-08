import Input from "../../pattern/input/input.js";

const DEFAULT_LOGIN_PARAMS_INPUT = {
	typeInput: 'text',
	idInput: 'loginInput',
	nameInput: 'login',
	labelText: 'Логин',
}

export default class LoginInput extends Input {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = Object.assign({}, DEFAULT_LOGIN_PARAMS_INPUT, paramsHBS);
		super(parentElement, finalParamsHBS);
	}
}