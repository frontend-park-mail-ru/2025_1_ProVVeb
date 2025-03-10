import Button from '../../pattern/button/button.js';
import store from '../../Store.js';
import { checkAuth } from '../../../modules/validation.js';
import api from '../../../modules/network.js';
import router from '../../../modules/router.js';
import Notification from '../notification/notification.js';

const DEFAULT_AUTH_PARAMS_BUTTON = {
	buttonText: 'Войти',
};

DEFAULT_AUTH_PARAMS_BUTTON.listenButton = {
	eventType: 'click',
	selector: '.button',
	callback: () => {
		const loginValue = store.getState('loginInput');
		const passwordValue = store.getState('passwordInput');

		if (checkAuth(loginValue, passwordValue)) {
			api.authUser(loginValue, passwordValue).then((respond) => {
				if (respond.success) {
					store.setState('myID', respond.data.id);
					router.navigateTo('feed');
					store.setState('profile_name', loginValue);
				} else {
					// const answer = JSON.parse(respond.message);
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

export default class AuthButton extends Button {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = { ...DEFAULT_AUTH_PARAMS_BUTTON, ...paramsHBS };
		super(parentElement, finalParamsHBS);
	}
}
