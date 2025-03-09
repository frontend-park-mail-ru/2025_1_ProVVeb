import Button from '../../pattern/button/button.js';
import store from '../../Store.js';
import { checkLogin } from '../../../modules/validation.js';

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

		if(checkLogin(loginValue, passwordValue, passwordAgainValue)){
			const respond = api.loginUser(loginValue, passwordValue);
			if(respond.success){
				router.navigateTo('auth');
			} else {
				const error = new Notification({ isWarning: true, isWithButton: true, title: respond.data.message });
				error.render();
			}
		}
	},
};

export default class LoginButton extends Button {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = { ...DEFAULT_LOGIN_PARAMS_BUTTON, ...paramsHBS };
		super(parentElement, finalParamsHBS);
	}
}
