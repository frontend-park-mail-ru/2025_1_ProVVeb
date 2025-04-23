export default class BaseComponent {
	public template: string;
	protected parentElement: HTMLElement;
	private listeners: { eventType: string, selector: string, callback: EventListener }[];

	constructor(template: string, parentElement: HTMLElement, style: string = '') {
		this.template = template;
		this.parentElement = parentElement;
		this.listeners = [];
		this.injectStyle(style);
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

	protected injectStyle(style: string): void {
		if (style != '') {
			const id = this.constructor.name + '-styles';
			if (!document.getElementById(id)) {
				const styleEl = document.createElement('style');
				styleEl.id = id;
				styleEl.innerHTML = style;
				document.head.appendChild(styleEl);
			}
		}
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
