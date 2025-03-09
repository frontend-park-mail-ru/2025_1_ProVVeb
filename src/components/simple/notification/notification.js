import BaseComponent from '../../BaseComponent.js';
import store from '../../Store.js';

export default class Notification extends BaseComponent {
    constructor(paramsHBS) {
        const templateHBS = Handlebars.templates['notification.hbs'];
        const templateHTML = templateHBS(paramsHBS);
        super(templateHTML, store.getState('notif_layer'));

        this.addListener(
            'click',
            '.cross',
            (event) => {
                event.target.parentElement.parentElement.remove();
            }
        );
    }

    render() {
        this.parentElement.innerHTML = this.template;
        this.attachListeners();
    }
}
