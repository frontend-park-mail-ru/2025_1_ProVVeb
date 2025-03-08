import Card from "../../pattern/card/card.js";
import ProgressBar from "../../simple/progressBar/progressBar.js";
import LoginInput from "../../simple/loginInput/loginInput.js";
import PasswordInput from "../../simple/passwordInput/passwordInput.js";
import LinkToLogin from "../../simple/linkToLogin/linkToLogin.js";
import AuthButton from "../../simple/authButton/authButton.js";

export default class AuthCard extends Card {
	constructor(parentElement) {
		const AUTH_CARD_PARAMS_CARD = {
			progressBar: new ProgressBar(parentElement, { progressPercent: 100 }).template,
			cardTitle: 'Продолжи свой поиск ❤️',
			linkToPage: new LinkToLogin(parentElement).template,
			fields: [
				new LoginInput(parentElement).template,
				new PasswordInput(parentElement).template,
			],
			button: new AuthButton(parentElement).template,
		};

		super(parentElement, AUTH_CARD_PARAMS_CARD);
	}
}