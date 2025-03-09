import Button from '../../pattern/button/button.js';
import store from '../../Store.js';
import { checkAuth } from '../../../modules/validation.js';
import api from '../../../modules/network.js'

const DEFAULT_AUTH_PARAMS_BUTTON = {
	buttonText: 'Войти',
};

DEFAULT_AUTH_PARAMS_BUTTON.listenButton = {
	eventType: 'click',
	selector: '.button',
	callback: () => {
		const loginValue = store.getState('loginInput');
		const passwordValue = store.getState('passwordInput');

		if(checkAuth(loginValue, passwordValue)){
			const respond = api.authUser(loginValue, passwordValue);
			if(respond.success){
				store.setState("myID", respond.data.id);
				router.navigateTo('feed');
			} else {
				const error = new Notification({ isWarning: true, isWithButton: true, title: respond.data.message });
				error.render();
			}
		}
	},
};

export default class AuthButton extends Button {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = { ...DEFAULT_AUTH_PARAMS_BUTTON, ...paramsHBS };
		super(parentElement, finalParamsHBS);
	}
}
