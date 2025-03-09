import Input from '../../pattern/input/input.js';
import store from '../../Store.js';
import Notification from '../notification/notification.js';
import { LOGIN_BRIEF_RULES, validator } from '../../../modules/validation.js';

const DEFAULT_LOGIN_PARAMS_INPUT = {
    typeInput: 'text',
    idInput: 'loginInput_01',
    nameInput: 'login',
    labelText: 'Логин',
    autocompleteInput: 'username',
};

DEFAULT_LOGIN_PARAMS_INPUT.listenInput = {
    eventType: 'input',
    selector: `#${DEFAULT_LOGIN_PARAMS_INPUT.idInput}`,
    callback: (event) => {
        if (store.getState('loginInput') != event.target.value) event.target.parentElement.classList.remove('incorrect');
        store.setState('loginInput', event.target.value);
    },
};

DEFAULT_LOGIN_PARAMS_INPUT.listenFocus = {
    eventType: 'blur',
    selector: `#${DEFAULT_LOGIN_PARAMS_INPUT.idInput}`,
    callback: () => {

        const loginValue = store.getState('loginInput');
        const loginElement = document.querySelectorAll('.inputContainer')[0];
        const loginValidation = validator(loginValue, LOGIN_BRIEF_RULES);

        if (!loginValidation.isOK && loginValue != '') {
            const error = new Notification({ isWarning: true, isWithButton: true, title: loginValidation.message });
            error.render();
            loginElement.classList.add('incorrect');
        } else {
            loginElement.classList.remove('incorrect');
        }
    },
};

export default class LoginInput extends Input {
    constructor(parentElement, paramsHBS = {}) {
        const finalParamsHBS = { ...DEFAULT_LOGIN_PARAMS_INPUT, ...paramsHBS };
        super(parentElement, finalParamsHBS);
    }
}
