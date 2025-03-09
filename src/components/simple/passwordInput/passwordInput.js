import Input from '../../pattern/input/input.js';

const DEFAULT_PASSWORD_PARAMS_INPUT = {
	typeInput: 'password',
	nameInput: 'password',
	idInput: 'passwordInput_01',
	labelText: 'Пароль',
	autocompleteInput: 'current-password',
}

export default class PasswordInput extends Input {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = { ...DEFAULT_PASSWORD_PARAMS_INPUT, ...paramsHBS };
		super(parentElement, finalParamsHBS);
	}
}
