import Input from '../../pattern/input/input';
import store from '../../Store';
import Notification from '../notification/notification';
import { PASSWORD_BRIEF_RULES, validator } from '../../../modules/validation';

interface PasswordInputParams {
	typeInput?: string;
	nameInput?: string;
	idInput?: string;
	labelText?: string;
	autocompleteInput?: string;
	listenInput?: {
		eventType: string;
		selector: string;
		callback: (event: Event) => void;
	};
	listenFocus?: {
		eventType: string;
		selector: string;
		callback: () => void;
	};
}


const DEFAULT_PASSWORD_PARAMS_INPUT: PasswordInputParams = {
	typeInput: 'password',
	nameInput: 'password',
	idInput: 'passwordInput_01',
	labelText: 'Пароль',
	autocompleteInput: 'current-password',
};

DEFAULT_PASSWORD_PARAMS_INPUT.listenInput = {
	eventType: 'input',
	selector: `#${DEFAULT_PASSWORD_PARAMS_INPUT.idInput}`,
	callback: (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (store.getState('passwordInput') !== target.value) {
			target.parentElement?.classList.remove('incorrect'); // Проверка на null
		}
		store.setState('passwordInput', target.value);
	},
};

DEFAULT_PASSWORD_PARAMS_INPUT.listenFocus = {
	eventType: 'blur',
	selector: `#${DEFAULT_PASSWORD_PARAMS_INPUT.idInput}`,
	callback: () => {
		const passwordValue = store.getState('passwordInput') as string;
		const passwordElement = document.querySelectorAll('.inputContainer')[1] as HTMLElement; // Типизируем
		const passwordValidation = validator(passwordValue, PASSWORD_BRIEF_RULES);

		if (!passwordValidation.isOK && passwordValue !== '') {
			const error = new Notification({
				isWarning: true,
				isWithButton: true,
				title: passwordValidation.message || '' // Убедитесь, что message — это строка
			});
			error.render();
			passwordElement.classList.add('incorrect');
		} else {
			passwordElement.classList.remove('incorrect');
		}
	},
};

export default class PasswordInput extends Input {
	constructor(parentElement: HTMLElement, paramsHBS: PasswordInputParams = {}) {
		const finalParamsHBS = { ...DEFAULT_PASSWORD_PARAMS_INPUT, ...paramsHBS };
		super(parentElement, finalParamsHBS);
	}
}
