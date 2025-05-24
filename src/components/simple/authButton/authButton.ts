import Button from '@pattern/button/button';
import store from '@store';
import { checkAuth } from '@validation';
import api from '@network';
import router, { AppPage } from '@router';
import Notification from '@notification';
import Confirm from '@simple/confirm/confirm';

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
					store.setState('myID', respond.data.user_id);
					store.setState('inSession', true);

					const data = await api.getProfile(respond.data.user_id);

					const ava = api.BASE_URL_PHOTO + (data?.data?.photos[0] ?? '');
					const name = `${data?.data?.firstName} ${data?.data?.lastName}`;

					if (name) { store.setState('profileName', name); }
					if (ava) { store.setState('ava', ava); }
					if (data?.data?.isMale) { store.setState('isMale', data?.data?.isMale); }

					await router.navigateTo(AppPage.Feed);
				} else {
					const JSONans = JSON.parse(respond.message as string);

					if (JSONans.message === 'sql: no rows in result set') {
						const confirmComponent = new Confirm({
							headTitle: 'Упс... Такого аккаунта не существует',
							title: 'Хотите перейти в Login?',
							isWarning: true,
						});
						const confirm = await confirmComponent.render();
						if (confirm) { router.navigateTo(AppPage.Login); }

						return;
					}

					const error = new Notification({
						isWarning: true,
						isWithButton: true,
						title: 'Неверный логин или пароль',
					});
					error.render();
				}
			}).catch(() => {
				const Error = new Notification({
					isWarning: true,
					isWithButton: true,
					title: 'Ошибка сети. Попробуйте позже',
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
