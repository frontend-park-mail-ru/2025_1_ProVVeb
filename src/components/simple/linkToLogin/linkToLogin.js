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
		router.navigateTo('login');
	},
};

export default class LinkToLogin extends LinkTo {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = { ...DEFAULT_LINK_TO_LOGIN_PARAMS_BUTTON, ...paramsHBS };
		super(parentElement, finalParamsHBS);
	}
}