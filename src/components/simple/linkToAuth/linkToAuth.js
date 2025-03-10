import LinkTo from '../../pattern/linkTo/linkTo.js';
import router from '../../../modules/router.js';

const DEFAULT_LINK_TO_AUTH_PARAMS_BUTTON = {
	idLink: 'linkToAuth',
	linkText: 'Уже есть аккаунт? Войти',
};

DEFAULT_LINK_TO_AUTH_PARAMS_BUTTON.listenRoute = {
	eventType: 'click',
	selector: `#${DEFAULT_LINK_TO_AUTH_PARAMS_BUTTON.idLink}`,
	callback: () => {
		router.navigateTo('auth');
	},
};

export default class LinkToLogin extends LinkTo {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = { ...DEFAULT_LINK_TO_AUTH_PARAMS_BUTTON, ...paramsHBS };
		super(parentElement, finalParamsHBS);
	}
}
