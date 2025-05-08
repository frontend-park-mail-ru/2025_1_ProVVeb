import BaseComponent from '@basecomp';
import templateHBS from './linkTo.hbs';

interface ListenerParams {
	eventType: string;
	selector: string;
	callback: () => void;
}

export interface LinkToParams {
	idLink: string;
	linkText: string;
	listenRoute: ListenerParams;
}

const DEFAULT_PARAMS_LINK: LinkToParams = {
    idLink: '',
    linkText: 'Ссылка',
    listenRoute: {
        eventType: '',
        selector: '',
        callback: () => { },
    },
};

export default class LinkTo extends BaseComponent {
    constructor(parentElement: HTMLElement, paramsHBS: Partial<LinkToParams> = {}) {
        const finalParamsHBS = { ...DEFAULT_PARAMS_LINK, ...paramsHBS };

        if (finalParamsHBS.idLink) {
            finalParamsHBS.listenRoute.selector = `#${finalParamsHBS.idLink}`;
        }

        const templateHTML = templateHBS(finalParamsHBS);
        super(templateHTML, parentElement);

        this.addListener(
            finalParamsHBS.listenRoute.eventType,
            finalParamsHBS.listenRoute.selector,
            finalParamsHBS.listenRoute.callback
        );
    }
}
