import Input, { InputParams } from '@pattern/input/input';
import store from '@store';
import Notification from '@notification';
import { LOGIN_BRIEF_RULES, validator } from '@validation';

const DEFAULT_LOGIN_PARAMS_INPUT: InputParams = {
	typeInput: 'text',
	idInput: 'loginInput_01',
	nameInput: 'login',
	labelText: 'Логин',
	autocompleteInput: 'username',
	listeners: [
		{
			eventType: 'input',
			selector: `#${'loginInput_01'}`,
			callback: (event: Event) => {
				const target = event.target as HTMLInputElement;
				if (store.getState('loginInput') !== target.value) {
					target.parentElement?.classList.remove('incorrect');
				}
				store.setState('loginInput', target.value);
			},
		},
		{
			eventType: 'blur',
			selector: `#${'loginInput_01'}`,
			callback: () => {
				const loginValue = store.getState('loginInput') as string;
				const loginElement = document.querySelectorAll('.inputContainer')[0];
				const loginValidation = validator(loginValue, LOGIN_BRIEF_RULES);

				if (!loginValidation.isOK && loginValue !== '') {
					const error = new Notification({
						isWarning: true,
						isWithButton: true,
						title: loginValidation.message || 'Технические неполадки...',
					});
					error.render();
					loginElement.classList.add('incorrect');

					const feedbackElement = document.querySelector('#feedback_loginInput_01');

					if (feedbackElement) {
						feedbackElement.classList.add('noneHide');
						feedbackElement.innerHTML = loginValidation.message || 'Технические неполадки...';
					}

				} else {
					loginElement.classList.remove('incorrect');
				}
			},
		},
	]
};

export default class LoginInput extends Input {
	constructor(parentElement: HTMLElement, paramsHBS: Partial<InputParams> = {}) {
		const finalParamsHBS = { ...DEFAULT_LOGIN_PARAMS_INPUT, ...paramsHBS };
		super(parentElement, finalParamsHBS);

		store.subscribe('my_new_login', (data: unknown) => {
			const inputElement = document.querySelector('#loginInput_01') as HTMLInputElement;
			if (inputElement) {
				inputElement.value = data as string;
			}
		});
	}
}
