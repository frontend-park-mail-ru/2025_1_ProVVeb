import FormCard from "../../pattern/formCard/formCard.js";
import ProgressBar from "../../simple/progressBar/progressBar.js";
import LoginInput from "../../simple/loginInput/loginInput.js";
import PasswordInput from "../../simple/passwordInput/passwordInput.js";
import LinkToLogin from "../../simple/linkToLogin/linkToLogin.js";
import AuthButton from "../../simple/authButton/authButton.js";

// Подтягивать из стора
export default class AuthCard extends FormCard {
	constructor(parentElement) {
		const componentConfigs = [
			{ key: "progressBar", class: ProgressBar, options: { progressPercent: 100 } },
			{ key: "linkToPage", class: LinkToLogin },
			{ key: "loginInput", class: LoginInput },
			{ key: "passwordInput", class: PasswordInput },
			{ key: "authButton", class: AuthButton },
		];

		const components = {};
		for (const { key, class: ComponentClass, options } of componentConfigs) {
			components[key] = new ComponentClass(parentElement, options);
		}

		super(parentElement, {
			progressBar: components.progressBar.template,
			cardTitle: "Продолжи свой поиск ❤️",
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
		Object.values(this.components).forEach(component => component.attachListeners());
	}
}






// export default class AuthCard extends Card {

// 	constructor(parentElement) {
// 		const progressBar = new ProgressBar(parentElement, { progressPercent: 100 });
// 		const linkToPage = new LinkToLogin(parentElement);
// 		const loginInput = new LoginInput(parentElement);
// 		const passwordInput = new PasswordInput(parentElement);
// 		const authButton = new AuthButton(parentElement);

// 		const AUTH_CARD_PARAMS_CARD = {
// 			progressBar: progressBar.template,
// 			cardTitle: 'Продолжи свой поиск ❤️',
// 			linkToPage: linkToPage.template,
// 			fields: [loginInput.template, passwordInput.template],
// 			button: authButton.template,
// 		};

// 		super(parentElement, AUTH_CARD_PARAMS_CARD);

// 		this.progressBar = progressBar;
// 		this.linkToPage = linkToPage;
// 		this.loginInput = loginInput;
// 		this.passwordInput = passwordInput;
// 		this.authButton = authButton;
// 	}

// 	render() {
// 		super.render();
// 		this.progressBar.attachListeners();
// 		this.linkToPage.attachListeners();
// 		this.loginInput.attachListeners();
// 		this.passwordInput.attachListeners()
// 		this.authButton.attachListeners();
// 	}
// }
