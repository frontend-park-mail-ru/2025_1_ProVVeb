import LinkTo from '../../pattern/linkTo/linkTo';
import router from '../../../modules/router';

interface LinkToParams {
	idLink: string;
	linkText: string;
	listenRoute?: {
		eventType: string;
		selector: string;
		callback: () => void;
	};
}

const DEFAULT_LINK_TO_AUTH_PARAMS_BUTTON: LinkToParams = {
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
	constructor(parentElement: HTMLElement, paramsHBS: Partial<LinkToParams> = {}) {
		const finalParamsHBS: LinkToParams = { ...DEFAULT_LINK_TO_AUTH_PARAMS_BUTTON, ...paramsHBS };
		super(parentElement, finalParamsHBS);
	}
}
