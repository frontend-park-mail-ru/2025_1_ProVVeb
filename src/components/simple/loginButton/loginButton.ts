import Button from '@pattern/button/button';
import store from '@store';
import { checkLogin } from '@validation';
import router from '@router';
import api from '@network';
import Notification from '@notification';

interface LoginButtonParams {
	buttonText: string;
	listenButton: {
		eventType: string;
		selector: string;
		callback: () => void;
	};
}

const DEFAULT_LOGIN_PARAMS_BUTTON: LoginButtonParams = {
	buttonText: 'Продолжить',
	listenButton: {
		eventType: 'click',
		selector: '.button',
		callback: () => {
			const loginValue = store.getState('loginInput') as string;
			const passwordValue = store.getState('passwordInput') as string;
			const passwordAgainValue = store.getState('passwordInputAgain') as string;

			if (checkLogin(loginValue, passwordValue, passwordAgainValue)) {
				api.loginUser(loginValue, passwordValue).then((respond: { success: boolean; message?: string }) => {
					if (respond.success) {
						router.navigateTo('auth');
						store.setState('my_new_login', loginValue);
					} else {
						const error = new Notification({
							isWarning: true,
							isWithButton: true,
							title: respond.message || 'Invalid credentials',
						});
						error.render();
					}
				}).catch((error: string) => {
					const Error = new Notification({ isWarning: true, isWithButton: true, title: error });
					Error.render();
				});
			}
		},
	},
};

export default class LoginButton extends Button {
	constructor(parentElement: HTMLElement, paramsHBS: Partial<LoginButtonParams> = {}) {
		const finalParamsHBS = { ...DEFAULT_LOGIN_PARAMS_BUTTON, ...paramsHBS };
		super(parentElement, finalParamsHBS);
	}
}
