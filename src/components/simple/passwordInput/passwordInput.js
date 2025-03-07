import Input from "../../pattern/input/input.js";

const PASSWORD_PARAMS_INPUT = {
	typeInput: 'password',
	idInput: 'passwordInput',
	nameInput: 'password',
	labelText: 'Пароль',
}

export default class PasswordInput extends Input {
	constructor(parentElement) {
		super(parentElement, PASSWORD_PARAMS_INPUT);
	}
}