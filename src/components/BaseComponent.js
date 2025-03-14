export default class BaseComponent {
	constructor(template, parentElement) {
		this.template = template;
		this.parentElement = parentElement;
		this.listeners = [];
	}

	render() {
		if (this.parentElement.innerHTML == '') {
			this.parentElement.innerHTML = this.template;
			this.attachListeners();
			return;
		}

		this.parentElement.insertAdjacentHTML('beforeend', this.template);
		this.attachListeners();
	}

	getRenderedComponent() {
		return this.parentElement.innerHTML;
	}

	addListener(eventType, selector, callback) {
		this.listeners.push({ eventType, selector, callback });
	}

	removeListeners() {
		this.listeners.forEach((listener) => {
			this.parentElement.querySelector(listener.selector)
				.removeEventListener(listener.eventType, listener.callback);
		});
		this.listeners = [];
	}

	attachListeners() {
		this.listeners.forEach((listener) => {
			const element = this.parentElement.querySelector(listener.selector);
			if (element) {
				element.addEventListener(listener.eventType, listener.callback);
			}
		});
	}
}
