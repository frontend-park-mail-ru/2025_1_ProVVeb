import FormCard from '../../pattern/formCard/formCard.js';
import ProgressBar from '../../simple/progressBar/progressBar.js';
import LoginInput from '../../simple/loginInput/loginInput.js';
import PasswordInput from '../../simple/passwordInput/passwordInput.js';
import LinkToLogin from '../../simple/linkToLogin/linkToLogin.js';
import AuthButton from '../../simple/authButton/authButton.js';

// Подтягивать из стора
export default class AuthCard extends FormCard {
	constructor(parentElement) {
		const componentConfigs = [
			{ key: 'progressBar', class: ProgressBar, options: { progressPercent: 100 } },
			{ key: 'linkToPage', class: LinkToLogin },
			{ key: 'loginInput', class: LoginInput },
			{ key: 'passwordInput', class: PasswordInput },
			{ key: 'authButton', class: AuthButton },
		];

		const components = {};
		componentConfigs.forEach(({ key, class: ComponentClass, options }) => {
			components[key] = new ComponentClass(parentElement, options);
		});

		super(parentElement, {
			progressBar: components.progressBar.template,
			cardTitle: 'Продолжи свой поиск ❤️',
			linkToPage: components.linkToPage.template,
			fields: [
				components.loginInput.template,
				components.passwordInput.template
			],
			button: components.authButton.template,
		});

		this.components = components;
	}

	render() {
		super.render();
		Object.values(this.components).forEach((component) => component.attachListeners());
	}
}
