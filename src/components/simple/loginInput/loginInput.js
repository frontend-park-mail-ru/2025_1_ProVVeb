import Input from '../../pattern/input/input.js';

const DEFAULT_LOGIN_PARAMS_INPUT = {
	typeInput: 'text',
	idInput: 'loginInput_01',
	nameInput: 'login',
	labelText: 'Логин',
	autocompleteInput: 'username',
}

export default class LoginInput extends Input {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = { ...DEFAULT_LOGIN_PARAMS_INPUT, ...paramsHBS };
		super(parentElement, finalParamsHBS);
	}
}
