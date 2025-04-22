import Button from '@pattern/button/button';
import store from '@store';
import { checkLogin } from '@validation';
import router, { AppPage } from '@router';
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
						
						//REDIRECT TO FEED
						api.authUser(loginValue, passwordValue).then(async (respond) => {
							if (respond.success) {
								store.setState('myID', respond.data.user_id);
								store.setState('inSession', true);
								await router.navigateTo(AppPage.Feed);
			
								const data = await api.getProfile(respond.data.user_id);
								const ava = api.BASE_URL_PHOTO + data?.data?.photos[0];
								const name = data?.data?.firstName + ' ' + data?.data?.lastName;
			
								if (name) store.setState('profileName', name);
								if (ava) store.setState('ava', ava);
							} else {
								const JSONans = JSON.parse(respond.message as string);
								let ans = '';
								if (JSONans.message == 'sql: no rows in result set')
									ans = 'Такого аккаунта не существует';
								else
									ans = 'Неверный логин или пароль';
								const error = new Notification({
									isWarning: true,
									isWithButton: true,
									title: ans,
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
						//END OF REDIRECT

						// router.navigateTo(AppPage.Auth);
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
