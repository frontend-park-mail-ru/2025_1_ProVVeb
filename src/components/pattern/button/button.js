import BaseComponent from '../../BaseComponent.js';

const DEFAULT_PARAMS_BUTTON = {
    buttonText: 'Кнопка',
};

DEFAULT_PARAMS_BUTTON.listenButton = {
    eventType: '',
    selector: '',
    callback: () => { },
};

export default class Button extends BaseComponent {
    constructor(parentElement, paramsHBS = {}) {
        const finalParamsHBS = { ...DEFAULT_PARAMS_BUTTON, ...paramsHBS };
        const templateHBS = Handlebars.templates['button.hbs'];
        const templateHTML = templateHBS(finalParamsHBS);
        super(templateHTML, parentElement);

        this.addListener(
            finalParamsHBS.listenButton.eventType,
            finalParamsHBS.listenButton.selector,
            finalParamsHBS.listenButton.callback
        );
    }
}
