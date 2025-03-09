import Button from '../../pattern/button/button.js';
import store from '../../Store.js';
import { checkAuth } from '../../../modules/validation.js'

 
const DEFAULT_AUTH_PARAMS_BUTTON = {
    buttonText: 'Войти',
};

DEFAULT_AUTH_PARAMS_BUTTON.listenButton = {
    eventType: 'click',
    selector: '.button',
    callback: () => {
        const loginValue = store.getState("loginInput");
        const passwordValue = store.getState("passwordInput");

        checkAuth(loginValue, passwordValue);
    },
};

export default class AuthButton extends Button {
    constructor(parentElement, paramsHBS = {}) {
        const finalParamsHBS = { ...DEFAULT_AUTH_PARAMS_BUTTON, ...paramsHBS };
        super(parentElement, finalParamsHBS);
    }
}
