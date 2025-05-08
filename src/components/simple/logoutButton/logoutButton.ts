import Button from '@pattern/button/button';
import api from '@network';
import router, { AppPage } from '@router';
import Notification from '@simple/notification/notification';

interface ButtonListenParams {
	eventType: string;
	selector: string;
	callback: () => void;
}

interface LogoutButtonParams {
	idButton: string;
	buttonText: string;
	listenButton: ButtonListenParams;
}

const DEFAULT_LOGOUT_PARAMS_BUTTON: LogoutButtonParams = {
	idButton: 'logoutButton',
	buttonText: 'Выйти',
	listenButton: {
		eventType: 'click',
		selector: '#logoutButton',
		callback: () => {
			api.logoutUser()
				.then(() => {
					router.navigateTo(AppPage.Auth);
				})
				.catch(() => {
					new Notification({
						headTitle: 'Что-то пошло не так...',
						title: 'Ошибка сервера. Попробуйте позже',
						isWarning: false,
						isWithButton: true
					}).render();
				});
		},
	},
};

export default class LogoutButton extends Button {
	constructor(parentElement: HTMLElement, paramsHBS: Partial<LogoutButtonParams> = {}) {
		const finalParamsHBS = { ...DEFAULT_LOGOUT_PARAMS_BUTTON, ...paramsHBS };
		super(parentElement, finalParamsHBS);
	}
}
