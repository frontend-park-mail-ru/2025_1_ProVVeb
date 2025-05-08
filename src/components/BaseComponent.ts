export default class BaseComponent {
	public template: string;
	protected parentElement: HTMLElement;
	private listeners: { eventType: string, selector: string, callback: EventListener }[];

	constructor(template: string, parentElement: HTMLElement, style: string = '') {
		this.template = template;
		this.parentElement = parentElement;
		this.listeners = [];
	}

	render(): void {
		if (this.parentElement.innerHTML === '') {
			this.parentElement.innerHTML = this.template;
			this.attachListeners();
			return;
		}

		this.parentElement.insertAdjacentHTML('beforeend', this.template);
		this.attachListeners();
	}

	getRenderedComponent(): string {
		return this.parentElement.innerHTML;
	}

	addListener(eventType: string, selector: string, callback: EventListener): void {
		this.listeners.push({ eventType, selector, callback });
	}

	removeListeners(): void {
		this.listeners.forEach((listener) => {
			const element = this.parentElement.querySelector(listener.selector);
			if (element) {
				element.removeEventListener(listener.eventType, listener.callback);
			}
		});
		this.listeners = [];
	}

	protected attachListeners(): void {
		this.listeners.forEach((listener) => {
			const element = this.parentElement.querySelector(listener.selector);
			if (element) {
				element.addEventListener(listener.eventType, listener.callback);
			}
		});
	}
}
