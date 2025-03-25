import FormCard from '../../pattern/formCard/formCard.js';
import ProgressBar from '../../simple/progressBar/progressBar.js';
import LoginInput from '../../simple/loginInput/loginInput.js';
import PasswordInput from '../../simple/passwordInput/passwordInput.js';
import LinkToAuth from '../../simple/linkToAuth/linkToAuth.js';
import LoginButton from '../../simple/loginButton/loginButton.js';
import store from '../../Store.js';
import { PASSWORD_BRIEF_RULES, validator } from '../../../modules/validation.js';
import Notification from '../../simple/notification/notification.js';

export default class LoginCard extends FormCard {
	constructor(parentElement) {
		const componentConfigs = [
			{ key: 'progressBar', class: ProgressBar, options: { progressPercent: 0 } },
			{ key: 'linkToPage', class: LinkToAuth },
			{ key: 'loginInput', class: LoginInput },
			{
				key: 'passwordInput',
				class: PasswordInput,
				options: {
					typeInput: 'password',
					nameInput: 'password',
					idInput: 'passwordInput_01',
					labelText: 'Пароль',
					autocompleteInput: 'new-password',
					listenInput: {
						eventType: 'input',
						selector: '#passwordInput_01',
						callback: (event) => {
							if (store.getState('passwordInput') !== event.target.value) {
								event.target.parentElement.nextElementSibling.classList.remove('incorrect');
								event.target.parentElement.classList.remove('incorrect');
							}
							store.setState('passwordInput', event.target.value);
						},
					},
					listenFocus: {
						eventType: 'blur',
						selector: '#passwordInput_01',
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
					},
				}
			},
			{
				key: 'repeatPasswordInput',
				class: PasswordInput,
				options: {
					nameInput: 'repeatPassword',
					idInput: 'passwordInput_02',
					labelText: 'Повторите пароль',
					autocompleteInput: 'new-password',
					listenInput: {
						eventType: 'input',
						selector: '#passwordInput_02',
						callback: (event) => {
							if (store.getState('passwordInputAgain') !== event.target.value) {
								event.target.parentElement.previousElementSibling.classList.remove('incorrect');
								event.target.parentElement.classList.remove('incorrect');
							}
							store.setState('passwordInputAgain', event.target.value);
						},
					},
					listenFocus: {
						eventType: 'blur',
						selector: '#passwordInput_02',
						callback: () => {

							const passwordValue = store.getState('passwordInputAgain');
							const passwordElement = document.querySelectorAll('.inputContainer')[2];
							const passwordValidation = validator(passwordValue, PASSWORD_BRIEF_RULES);

							if (!passwordValidation.isOK && passwordValue !== '') {
								const error = new Notification({ isWarning: true, isWithButton: true, title: passwordValidation.message });
								error.render();
								passwordElement.classList.add('incorrect');
							} else {
								passwordElement.classList.remove('incorrect');
							}
						},
					},
				}
			},
			{ key: 'authButton', class: LoginButton },
		];

		const components = {};
		componentConfigs.forEach(({ key, class: ComponentClass, options }) => {
			components[key] = new ComponentClass(parentElement, options);
		});

		const LOGIN_CARD_PARAMS_CARD = {
			progressBar: components.progressBar.template,
			cardTitle: 'Настроим твой вход 🔑',
			linkToPage: components.linkToPage.template,
			fields: [
				components.loginInput.template,
				components.passwordInput.template,
				components.repeatPasswordInput.template
			],
			button: components.authButton.template,
		};

		super(parentElement, LOGIN_CARD_PARAMS_CARD);

		this.components = components;
	}

	render() {
		super.render();
		Object.values(this.components).forEach((component) => component.attachListeners());
	}
}
