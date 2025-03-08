import Input from '../../pattern/input/input.js';

const DEFAULT_PASSWORD_PARAMS_INPUT = {
    typeInput: 'password',
    idInput: 'passwordInput',
    nameInput: 'password',
    labelText: 'Пароль',
};

export default class PasswordInput extends Input {
    constructor(parentElement, paramsHBS = {}) {
        const finalParamsHBS = { ...DEFAULT_PASSWORD_PARAMS_INPUT, ...paramsHBS };
        super(parentElement, finalParamsHBS);
    }
}
