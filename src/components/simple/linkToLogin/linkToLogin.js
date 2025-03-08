import LinkTo from '../../pattern/linkTo/linkTo.js';

const DEFAULT_LINK_TO_LOGIN_PARAMS_BUTTON = {
    idLink: 'linkToLogin',
    linkText: 'Создать аккаунт',
};

export default class LinkToLogin extends LinkTo {
    constructor(parentElement, paramsHBS = {}) {
        const finalParamsHBS = { ...DEFAULT_LINK_TO_LOGIN_PARAMS_BUTTON, ...paramsHBS };
        super(parentElement, finalParamsHBS);
    }
}
