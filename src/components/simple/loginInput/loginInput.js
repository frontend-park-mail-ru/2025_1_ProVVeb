import Input from "../../pattern/input/input.js";

const LOGIN_PARAMS_INPUT = {
	typeInput: 'text',
	idInput: 'loginInput',
	nameInput: 'login',
	labelText: 'Логин',
}

export default class LoginInput extends Input {
	constructor(parentElement) {
		super(parentElement, LOGIN_PARAMS_INPUT);
	}
}