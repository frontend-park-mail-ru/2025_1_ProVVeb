import BaseComponent from '../../BaseComponent.js';
import store from '../../Store.js';
import templateHBS from './notification.hbs';

export default class Notification extends BaseComponent {
	constructor(paramsHBS) {
		const templateHTML = templateHBS(paramsHBS);
		super(templateHTML, store.getState('notif_layer'));

		this.addListener(
			'click',
			'.notification__cross',
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
