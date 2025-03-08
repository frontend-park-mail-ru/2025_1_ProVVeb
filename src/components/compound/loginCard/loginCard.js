import Card from "../../pattern/card/card.js";
import ProgressBar from "../../simple/progressBar/progressBar.js";
import LoginInput from "../../simple/loginInput/loginInput.js";
import PasswordInput from "../../simple/passwordInput/passwordInput.js";
import LoginButton from "../../simple/loginButton/loginButton.js";

export default class AuthCard extends Card {
	constructor(parentElement) {
		const AUTH_CARD_PARAMS_CARD = {
			progressBar: new ProgressBar(parentElement, { progressPercent: 0 }).template,
			cardTitle: 'Настроим твой вход 🔑',
			fields: [
				new LoginInput(parentElement).template,
				new PasswordInput(parentElement).template,
				new PasswordInput(parentElement, { labelText: 'Повторите пароль' }).template,
			],
			button: new LoginButton(parentElement).template,
		};

		super(parentElement, AUTH_CARD_PARAMS_CARD);
	}
}