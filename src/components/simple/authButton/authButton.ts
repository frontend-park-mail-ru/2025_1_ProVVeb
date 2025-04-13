import Button from '@pattern/button/button';
import store from '@store';
import { checkAuth } from '@validation';
import api from '@network';
import router, { AppPage } from '@router';
import Notification from '@notification';

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
					await router.navigateTo(AppPage.Feed);
					store.setState('profileName', loginValue);
					
					const data = await api.getProfile(2); //<- respond.data.id
					const ava = data?.data?.avatar;
					if(ava) store.setState('ava', ava);
				} else {
					const JSONans = JSON.parse(respond.message as string);
					let ans = '';
					if (JSONans.message == 'No such user')
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
		}
	},
};

export default class AuthButton extends Button {
	constructor(parentElement: HTMLElement, paramsHBS: Partial<AuthButtonParams> = {}) {
		const finalParamsHBS: AuthButtonParams = { ...DEFAULT_AUTH_PARAMS_BUTTON, ...paramsHBS };
		super(parentElement, finalParamsHBS);
	}
}
