import Button from '../../pattern/button/button.js';
import store from '../../Store.js';
import { checkLogin } from '../../../modules/validation.js';
import router from '../../../modules/router.js';
import api from '../../../modules/network.js';

const DEFAULT_LOGIN_PARAMS_BUTTON = {
	buttonText: 'Продолжить',
};

DEFAULT_LOGIN_PARAMS_BUTTON.listenButton = {
	eventType: 'click',
	selector: '.button',
	callback: () => {
		const loginValue = store.getState('loginInput');
		const passwordValue = store.getState('passwordInput');
		const passwordAgainValue = store.getState('passwordInputAgain');

		if (checkLogin(loginValue, passwordValue, passwordAgainValue)) {
			api.loginUser(loginValue, passwordValue).then((respond) => {
				if (respond.success) {
					router.navigateTo('auth');
					store.setState("my_new_login", loginValue)
				} else {
					const error = new Notification({ 
						isWarning: true, 
						isWithButton: true, 
						title: respond.message || 'Invalid credentials', 
					});
					error.render();
				}
			}).catch((error) => {
				const Error = new Notification({ isWarning: true, isWithButton: true, title: error });
				Error.render();
			});
		}
	},
};

export default class LoginButton extends Button {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = { ...DEFAULT_LOGIN_PARAMS_BUTTON, ...paramsHBS };
		super(parentElement, finalParamsHBS);
	}
}
