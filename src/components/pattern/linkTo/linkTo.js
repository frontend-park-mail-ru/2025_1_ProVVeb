import BaseComponent from '../../BaseComponent.js';

const DEFAULT_PARAMS_LINK = {
    idLink: '',
    linkText: 'Ссылка',
};

DEFAULT_PARAMS_LINK.listenRoute = {
    eventType: '',
    selector: '',
    callback: () => { },
};

export default class LinkTo extends BaseComponent {
    constructor(parentElement, paramsHBS = {}) {
        const finalParamsHBS = { ...DEFAULT_PARAMS_LINK, ...paramsHBS };

        if (finalParamsHBS.idLink) {
            finalParamsHBS.listenRoute.selector = `#${finalParamsHBS.idLink}`;
        }

        const templateHBS = Handlebars.templates['linkTo.hbs'];
        const templateHTML = templateHBS(finalParamsHBS);
        super(templateHTML, parentElement);

        console.log('Я ЛИНК', this);
        this.addListener(
            finalParamsHBS.listenRoute.eventType,
            finalParamsHBS.listenRoute.selector,
            finalParamsHBS.listenRoute.callback
        );
    }
}
