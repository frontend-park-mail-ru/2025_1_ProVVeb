import Input from '../../pattern/input/input.js';
import store from '../../Store.js';
import Notification from '../notification/notification.js';
import { PASSWORD_BRIEF_RULES, validator } from '../../../modules/validation.js';

const DEFAULT_PASSWORD_PARAMS_INPUT = {
	typeInput: 'password',
	nameInput: 'password',
	idInput: 'passwordInput_01',
	labelText: 'Пароль',
	autocompleteInput: 'current-password',
};

DEFAULT_PASSWORD_PARAMS_INPUT.listenInput = {
	eventType: 'input',
	selector: `#${DEFAULT_PASSWORD_PARAMS_INPUT.idInput}`,
	callback: (event) => {
		if (store.getState('passwordInput') !== event.target.value) { event.target.parentElement.classList.remove('incorrect'); }
		store.setState('passwordInput', event.target.value);
	},
};

DEFAULT_PASSWORD_PARAMS_INPUT.listenFocus = {
	eventType: 'blur',
	selector: `#${DEFAULT_PASSWORD_PARAMS_INPUT.idInput}`,
	callback: () => {

		const passwordValue = store.getState('passwordInput');
		const passwordElement = document.querySelectorAll('.inputContainer')[1];
		const passwordValidation = validator(passwordValue, PASSWORD_BRIEF_RULES);

		if (!passwordValidation.isOK && passwordValue !== '') {
			const error = new Notification({ isWarning: true, isWithButton: true, title: passwordValidation.message });
			error.render();
			passwordElement.classList.add('incorrect');
		} else {
			passwordElement.classList.remove('incorrect');
		}
	},
};

export default class PasswordInput extends Input {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = { ...DEFAULT_PASSWORD_PARAMS_INPUT, ...paramsHBS };
		super(parentElement, finalParamsHBS);
	}
}
