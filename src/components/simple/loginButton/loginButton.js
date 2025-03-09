import Button from '../../pattern/button/button.js';
import store from '../../Store.js';
import { checkLogin } from '../../../modules/validation.js';

const DEFAULT_LOGIN_PARAMS_BUTTON = {
    buttonText: 'Продолжить',
};

DEFAULT_LOGIN_PARAMS_BUTTON.listenButton = {
    eventType: 'click',
    selector: '.button',
    callback: () => {
        const loginValue = store.getState('loginInput');
        const passwordValue = store.getState('passwordInput');
        const passwordAgainValue = store.getState('passwordInputAgain');

        checkLogin(loginValue, passwordValue, passwordAgainValue);
    },
};

export default class LoginButton extends Button {
    constructor(parentElement, paramsHBS = {}) {
        const finalParamsHBS = { ...DEFAULT_LOGIN_PARAMS_BUTTON, ...paramsHBS };
        super(parentElement, finalParamsHBS);
    }
}
