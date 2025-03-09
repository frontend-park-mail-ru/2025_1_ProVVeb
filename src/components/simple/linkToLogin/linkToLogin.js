import LinkTo from '../../pattern/linkTo/linkTo.js';
import router from '../../../modules/router.js';

const DEFAULT_LINK_TO_LOGIN_PARAMS_BUTTON = {
    idLink: 'linkToLogin',
    linkText: 'Создать аккаунт',
};

DEFAULT_LINK_TO_LOGIN_PARAMS_BUTTON.listenRoute = {
    eventType: 'click',
    selector: `#${DEFAULT_LINK_TO_LOGIN_PARAMS_BUTTON.idLink}`,
    callback: () => {
        // console.log("Отладчик: перешел на регистрацию");
        router.navigateTo('login');
    },
};

export default class LinkToLogin extends LinkTo {
    constructor(parentElement, paramsHBS = {}) {
        const finalParamsHBS = { ...DEFAULT_LINK_TO_LOGIN_PARAMS_BUTTON, ...paramsHBS };
        super(parentElement, finalParamsHBS);
    }
}

// Устанавливаем обработчик через store
// LinkToLogin.setLinkHandler(finalParamsHBS.idLink, () => {
// 	console.log("Отладчик: перешел на регистрацию");
// 	router.navigateTo("login");
// });
// static setLinkHandler(id, callback) {
// 	const handlers = store.getState("linkHandlers") || {};
// 	handlers[id] = callback;
// 	store.setState("linkHandlers", handlers);
// }
