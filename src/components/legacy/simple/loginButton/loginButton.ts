import Button from '@pattern/button/button';
import store from '@store';
import { checkLogin } from '@validation';
import router, { AppPage } from '@router';

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
			const loginValue = (store.getState('loginInput') as string);
			const passwordValue = (store.getState('passwordInput') as string);
			const passwordAgainValue = (store.getState('passwordInputAgain') as string);

			if (checkLogin(loginValue, passwordValue, passwordAgainValue)) {
				const user = store.getState('myUser') as any;
				user.login = loginValue;
				user.password = passwordValue;
				store.setState('MyUser', user);

				router.navigateTo(AppPage.StepPage);
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
