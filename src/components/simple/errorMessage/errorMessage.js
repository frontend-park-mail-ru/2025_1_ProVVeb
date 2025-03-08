import BaseComponent from "../../BaseComponent.js";

export default class Notification extends BaseComponent {
    constructor(parentElement, paramsHBS) {
        const templateHBS = Handlebars.templates['errorMessage.hbs'];
        const templateHTML = templateHBS(paramsHBS);
        super(templateHTML, parentElement);
    }
}