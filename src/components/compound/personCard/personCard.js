import BaseComponent from '../../BaseComponent.js';

const DEFAULT_PARAMS_PERSON_CARD = {
    srcPersonPicture: 'media/error/400x600.jpg',
    personName: 'Имя',
    personAge: 16,
    personDescription: 'Краткое описание человека...',
};

export default class PersonCard extends BaseComponent {
    constructor(parentElement, paramsHBS = {}) {
        const finalParamsHBS = { ...DEFAULT_PARAMS_PERSON_CARD, ...paramsHBS };
        const templateHBS = Handlebars.templates['personCard.hbs'];
        const templateHTML = templateHBS(finalParamsHBS);
        super(templateHTML, parentElement);
    }
}
