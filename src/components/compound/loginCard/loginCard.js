import Card from '../../pattern/card/card.js';
import ProgressBar from '../../simple/progressBar/progressBar.js';
import LoginInput from '../../simple/loginInput/loginInput.js';
import PasswordInput from '../../simple/passwordInput/passwordInput.js';
import LinkToAuth from '../../simple/linkToAuth/linkToAuth.js';
import LoginButton from '../../simple/loginButton/loginButton.js';

export default class LoginCard extends Card {
    constructor(parentElement) {

        const LOGIN_CARD_PARAMS_CARD = {
            progressBar: new ProgressBar(parentElement, { progressPercent: 0 }).template,
            cardTitle: 'Настроим твой вход 🔑',
            linkToPage: new LinkToAuth(parentElement).template,
            fields: [
                new LoginInput(parentElement).template,
                new PasswordInput(parentElement).template,
                new PasswordInput(parentElement, { labelText: 'Повторите пароль' }).template,
            ],
            button: new LoginButton(parentElement).template,
        };

        super(parentElement, LOGIN_CARD_PARAMS_CARD);
    }
}
