import BaseComponent from '../../BaseComponent.js';
import store from '../../Store.js';

const DEFAULT_PARAMS_INPUT = {
    typeInput: 'text',
    idInput: '',
    nameInput: '',
    labelText: 'Поле ввода',
};

export default class Input extends BaseComponent {
    constructor(parentElement, paramsHBS = {}) {
        const finalParamsHBS = { ...DEFAULT_PARAMS_INPUT, ...paramsHBS };
        const templateHBS = Handlebars.templates['input.hbs'];
        const templateHTML = templateHBS(finalParamsHBS);
        super(templateHTML, parentElement);
    }
}
