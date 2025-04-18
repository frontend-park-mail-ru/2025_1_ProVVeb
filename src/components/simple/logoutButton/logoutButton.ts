import Button from '@pattern/button/button';
import api from '@network';
import router from '@router';

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
				.then((response) => {
					// console.log('Выход выполнен успешно:', response);
					router.navigateTo('auth');
				})
				.catch((error) => {
					console.error('Ошибка при выходе:', error);
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
