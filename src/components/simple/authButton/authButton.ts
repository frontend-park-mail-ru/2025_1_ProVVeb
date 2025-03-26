import Button from '../../pattern/button/button';
import store from '../../Store';
import { checkAuth } from '../../../modules/validation';
import api from '../../../modules/network';
import router from '../../../modules/router';
import Notification from '../notification/notification';

interface AuthButtonParams {
	buttonText: string;
	listenButton?: {
		eventType: string;
		selector: string;
		callback: () => void;
	};
}

const DEFAULT_AUTH_PARAMS_BUTTON: AuthButtonParams = {
	buttonText: 'Войти',
};

DEFAULT_AUTH_PARAMS_BUTTON.listenButton = {
	eventType: 'click',
	selector: '.button',
	callback: () => {
		const loginValue = store.getState('loginInput') as string;
		const passwordValue = store.getState('passwordInput') as string;

		if (checkAuth(loginValue, passwordValue)) {
			api.authUser(loginValue, passwordValue).then(async (respond) => {
				if (respond.success) {
					store.setState('myID', respond.data.id);
					await router.navigateTo('feed');
					store.setState('profileName', loginValue);
				} else {
					const error = new Notification({
						isWarning: true,
						isWithButton: true,
						title: respond.message || 'Invalid credentials',
					});
					error.render();
				}
			}).catch((error: Error) => {
				const Error = new Notification({
					isWarning: true,
					isWithButton: true,
					title: error.message,
				});
				Error.render();
			});
		}
	},
};

export default class AuthButton extends Button {
	constructor(parentElement: HTMLElement, paramsHBS: Partial<AuthButtonParams> = {}) {
		const finalParamsHBS: AuthButtonParams = { ...DEFAULT_AUTH_PARAMS_BUTTON, ...paramsHBS };
		super(parentElement, finalParamsHBS);
	}
}
