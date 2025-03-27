import Input from '@pattern/input/input';
import store from '@store';
import Notification from '@notification';
import { PASSWORD_BRIEF_RULES, validator } from '@validation';
import { ListenerParams } from '@pattern/input/input'

interface PasswordInputParams {
	typeInput: string;
	nameInput: string;
	idInput: string;
	labelText: string;
	autocompleteInput: string;
	listeners: ListenerParams[];
}


const DEFAULT_PASSWORD_PARAMS_INPUT: Partial<PasswordInputParams> = {
	typeInput: 'password',
	nameInput: 'password',
	idInput: 'passwordInput_01',
	labelText: 'Пароль',
	autocompleteInput: 'current-password',
	listeners: []
};

DEFAULT_PASSWORD_PARAMS_INPUT.listeners?.push({
	eventType: 'input',
	selector: `#${DEFAULT_PASSWORD_PARAMS_INPUT.idInput}`,
	callback: (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (store.getState('passwordInput') !== target.value) {
			target.parentElement?.classList.remove('incorrect');
		}
		store.setState('passwordInput', target.value);
	},
});

DEFAULT_PASSWORD_PARAMS_INPUT.listeners?.push({
	eventType: 'blur',
	selector: `#${DEFAULT_PASSWORD_PARAMS_INPUT.idInput}`,
	callback: () => {
		const passwordValue = store.getState('passwordInput') as string;
		const passwordElement = document.querySelectorAll('.inputContainer')[1] as HTMLElement;
		const passwordValidation = validator(passwordValue, PASSWORD_BRIEF_RULES);

		if (!passwordValidation.isOK && passwordValue !== '') {
			const error = new Notification({
				isWarning: true,
				isWithButton: true,
				title: passwordValidation.message || 'Технические неполадки...'
			});
			error.render();
			passwordElement.classList.add('incorrect');
		} else {
			passwordElement.classList.remove('incorrect');
		}
	},
});

export default class PasswordInput extends Input {
	constructor(parentElement: HTMLElement, paramsHBS: Partial<PasswordInputParams> = {}) {
		const finalParamsHBS = { ...DEFAULT_PASSWORD_PARAMS_INPUT, ...paramsHBS };
		super(parentElement, finalParamsHBS);
	}
}
