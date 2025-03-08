import Card from "../../pattern/card/card.js";
import ProgressBar from "../../simple/progressBar/progressBar.js";
import LoginInput from "../../simple/loginInput/loginInput.js";
import PasswordInput from "../../simple/passwordInput/passwordInput.js";
import LinkToAuth from "../../simple/linkToAuth/linkToAuth.js";
import LoginButton from "../../simple/loginButton/loginButton.js";

export default class LoginCard extends Card {
	constructor(parentElement) {
		const componentConfigs = [
			{ key: "progressBar", class: ProgressBar, options: { progressPercent: 0 } },
			{ key: "linkToPage", class: LinkToAuth },
			{ key: "loginInput", class: LoginInput },
			{ key: "passwordInput", class: PasswordInput },
			{ key: "repeatPasswordInput", class: PasswordInput, options: { labelText: "Повторите пароль" } },
			{ key: "authButton", class: LoginButton },
		];

		const components = {};
		for (const { key, class: ComponentClass, options = {} } of componentConfigs) {
			components[key] = new ComponentClass(parentElement, options);
		}

		const LOGIN_CARD_PARAMS_CARD = {
			progressBar: components.progressBar.template,
			cardTitle: "Настроим твой вход 🔑",
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
		Object.values(this.components).forEach(component => component.attachListeners());
	}
}