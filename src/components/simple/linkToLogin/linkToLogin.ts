import LinkTo from '@pattern/linkTo/linkTo';
import router from '@router';

interface LinkToParams {
	idLink: string;
	linkText: string;
	listenRoute?: {
		eventType: string;
		selector: string;
		callback: () => void;
	};
}

const DEFAULT_LINK_TO_LOGIN_PARAMS_BUTTON: LinkToParams = {
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
    constructor(parentElement: HTMLElement, paramsHBS: Partial<LinkToParams> = {}) {
        const finalParamsHBS: LinkToParams = { ...DEFAULT_LINK_TO_LOGIN_PARAMS_BUTTON, ...paramsHBS };
        super(parentElement, finalParamsHBS);
    }
}
