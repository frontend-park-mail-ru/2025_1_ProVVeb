import FormCard from '@pattern/formCard/formCard';
import ProgressBar from '@simple/progressBar/progressBar';
import LoginInput from '@simple/loginInput/loginInput';
import PasswordInput from '@simple/passwordInput/passwordInput';
import LinkToAuth from '@simple/linkToAuth/linkToAuth';
import LoginButton from '@simple/loginButton/loginButton';
import store from '@store';
import { PASSWORD_BRIEF_RULES, validator } from '@validation';
import Notification from '@notification';

interface LoginCardParams {
	progressBar: string;
	cardTitle: string;
	linkToPage: string;
	fields: string[];
	button: string;
}

interface ComponentConfig {
	key: string;
	class: new (parentElement: HTMLElement, options?: any) => any;
	options?: any;
}

export default class LoginCard extends FormCard {
	private components: Record<string, any>;

	constructor(parentElement: HTMLElement) {
		const componentConfigs: ComponentConfig[] = [
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
					listeners: [
						{
							eventType: 'click',
							selector: `.passwordInput_01`,
							callback: (event: Event) => {
								const target = event.target as HTMLElement;
								const input = target.parentElement?.previousElementSibling?.previousElementSibling as HTMLInputElement; 
								const toggle = target.parentElement;
								const closedEye = toggle?.querySelector('.eye-icon--closed') as HTMLElement;
								const openedEye = toggle?.querySelector('.eye-icon--opened') as HTMLElement;
								
								if(input?.type == undefined) return;

								if(input.type == 'password'){
									input.type = 'text';
									closedEye.style.display = 'none';
									openedEye.style.display = 'block';
								}else{
									input.type = 'password';
									closedEye.style.display = 'block';
									openedEye.style.display = 'none';
								}
							},
						},
						{
							eventType: 'input',
							selector: '#passwordInput_01',
							callback: (event: Event) => {
								const target = event.target as HTMLInputElement;
								if (store.getState('passwordInput') !== target.value) {
									target.parentElement?.nextElementSibling?.classList.remove('incorrect');
									target.parentElement?.classList.remove('incorrect');
								}
								store.setState('passwordInput', target.value);
							},
						},
						{
							eventType: 'blur',
							selector: '#passwordInput_01',
							callback: () => {
								const passwordValue = store.getState('passwordInput') as string;
								const passwordElement = document.querySelectorAll('.inputContainer')[1] as HTMLElement;
								const passwordValidation = validator(passwordValue, PASSWORD_BRIEF_RULES);

								if (!passwordValidation.isOK && passwordValue !== '') {
									const error = new Notification({
										isWarning: true,
										isWithButton: true,
										title: passwordValidation.message || 'Ааа Хватит падать',
									});
									error.render();
									passwordElement.classList.add('incorrect');

									// Form Validation
									const feedbackElement = document.querySelector(`#feedback_passwordInput_01`);

									if (feedbackElement) {
										feedbackElement.classList.add('noneHide');
										feedbackElement.innerHTML = passwordValidation.message || 'Технические неполадки...';
									}
								} else {
									passwordElement.classList.remove('incorrect');
								}
							},
						},
					]
				},
			},
			{
				key: 'repeatPasswordInput',
				class: PasswordInput,
				options: {
					nameInput: 'repeatPassword',
					idInput: 'passwordInput_02',
					labelText: 'Повторите пароль',
					autocompleteInput: 'new-password',
					listeners: [
						{
							eventType: 'click',
							selector: `.passwordInput_02`,
							callback: (event: Event) => {
								const target = event.target as HTMLElement;
								const input = target.parentElement?.previousElementSibling?.previousElementSibling as HTMLInputElement; 
								const toggle = target.parentElement;
								const closedEye = toggle?.querySelector('.eye-icon--closed') as HTMLElement;
								const openedEye = toggle?.querySelector('.eye-icon--opened') as HTMLElement;
								
								if(input?.type == undefined) return;

								if(input.type == 'password'){
									input.type = 'text';
									closedEye.style.display = 'none';
									openedEye.style.display = 'block';
								}else{
									input.type = 'password';
									closedEye.style.display = 'block';
									openedEye.style.display = 'none';
								}
							},
						},
						{
							eventType: 'input',
							selector: '#passwordInput_02',
							callback: (event: Event) => {
								const target = event.target as HTMLInputElement;
								if (store.getState('passwordInputAgain') !== target.value) {
									target.parentElement?.previousElementSibling?.classList.remove('incorrect');
									target.parentElement?.classList.remove('incorrect');
								}
								store.setState('passwordInputAgain', target.value);
							},
						},
						{
							eventType: 'blur',
							selector: '#passwordInput_02',
							callback: () => {
								const passwordValue = store.getState('passwordInputAgain') as string;
								const passwordElement = document.querySelectorAll('.inputContainer')[2] as HTMLElement;
								const passwordValidation = validator(passwordValue, PASSWORD_BRIEF_RULES);

								if (!passwordValidation.isOK && passwordValue !== '') {
									const error = new Notification({
										isWarning: true,
										isWithButton: true,
										title: passwordValidation.message || 'Падать больно',
									});
									error.render();
									passwordElement.classList.add('incorrect');

									// Form Validation
									const feedbackElement = document.querySelector(`#feedback_passwordInput_02`);

									if (feedbackElement) {
										feedbackElement.classList.add('noneHide');
										feedbackElement.innerHTML = passwordValidation.message || 'Технические неполадки...';
									}
								} else {
									passwordElement.classList.remove('incorrect');
								}
							},
						}
					]
				},
			},
			{ key: 'authButton', class: LoginButton },
		];

		const components: Record<string, any> = {};
		componentConfigs.forEach(({ key, class: ComponentClass, options }) => {
			components[key] = new ComponentClass(parentElement, options);
		});

		const LOGIN_CARD_PARAMS_CARD: LoginCardParams = {
			progressBar: components.progressBar.template,
			cardTitle: 'Настроим твой вход 🔑',
			linkToPage: components.linkToPage.template,
			fields: [
				components.loginInput.template,
				components.passwordInput.template,
				components.repeatPasswordInput.template,
			],
			button: components.authButton.template,
		};

		super(parentElement, LOGIN_CARD_PARAMS_CARD);
		this.components = components;
	}

	render() {
		super.render();
		Object.values(this.components).forEach((component) => component.attachListeners?.());
	}
}
