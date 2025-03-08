import BaseComponent from '../../BaseComponent.js';
import store from '../../Store.js';

const DEFAULT_PARAMS_LINK = {
    idLink: 'iiiiii',
    linkText: 'Ссылка',
};

export default class LinkTo extends BaseComponent {
    constructor(parentElement, paramsHBS = {}) {
        const finalParamsHBS = { ...DEFAULT_PARAMS_LINK, ...paramsHBS };

        const templateHBS = Handlebars.templates['linkTo.hbs'];
        const templateHTML = templateHBS(finalParamsHBS);
        super(templateHTML, parentElement);
    }
}
