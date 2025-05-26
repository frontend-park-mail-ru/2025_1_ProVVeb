import {
	VirtualNode,
	parseHTML,
	renderVDOM,
	injectCSSIntoVDOM,
	EventDescriptor,
	VirtualElement,
	patchVDOM,
} from './utils';

export type TemplateProvider = string | ((props?: any) => string);

export class VBC<P = {}> {
	protected isRendered: boolean;

	protected props: P;

	protected defaultProps: Partial<P>;

	protected templateHBS: TemplateProvider;

	protected style: string;

	protected eventsList: EventDescriptor[];

	protected vdom: VirtualNode;

	protected old_vdom: VirtualNode;

	protected root?: HTMLElement;

	public point?: HTMLElement;

	private readonly id: string;

	private domElement: HTMLElement | null = null;

	constructor(
		templateOrHBS: TemplateProvider,
		defaultProps: Partial<P> = {},
		style: string = '',
		eventsList: EventDescriptor[] = [],
		props?: P
	) {
		this.id = `vbc-${Math.random().toString(36).slice(2, 11)}`;

		this.defaultProps = defaultProps;
		this.props = { ...this.defaultProps, ...props } as P;
		this.templateHBS = templateOrHBS;
		this.style = style;
		this.eventsList = eventsList;

		this.vdom = this.createVDOM();

		this.root = renderVDOM(this.vdom) as HTMLElement;
		this.isRendered = false;
		this.setID();
		this.old_vdom = JSON.parse(JSON.stringify(this.vdom));
	}

	private createVDOM() {
		const compiledHTML = this.compileTemplate();
		let newVDOM = parseHTML(compiledHTML);
		newVDOM = injectCSSIntoVDOM(this.style, newVDOM);
		this.eventsList.forEach((ev) => this.injectScript(ev.selector, ev.eventType, ev.handler, newVDOM));
		this.setID(newVDOM);

		return newVDOM;
	}

	protected syncronize() {
		this.old_vdom = JSON.parse(JSON.stringify(this.vdom));
	}

	public getDOM(): HTMLElement | null {
		if (this.domElement && document.contains(this.domElement)) {
			return this.domElement;
		}
		this.domElement = document.querySelector(`[data-vbc-id="${this.id}"]`);
		return this.domElement;
	}

	public update(force = false): void {
		const mountPoint = this.getDOM()?.parentElement as HTMLElement;
		if (!mountPoint) { return; }

		if (force) {
			const currentDOM = this.getDOM();
			if (currentDOM) { patchVDOM(this.old_vdom, this.vdom, currentDOM); }
			this.root = renderVDOM(this.vdom) as HTMLElement;
			this.syncronize();
			return;
		}

		const newVDOM = this.createVDOM();

		const newRoot = renderVDOM(this.vdom) as HTMLElement;
		const currentDOM = this.getDOM();
		if (currentDOM) { patchVDOM(this.old_vdom, newVDOM, currentDOM); }

		this.root = newRoot;
		this.syncronize();
		this.vdom = newVDOM;
	}

	public injectProps(newProps: Partial<P>): void {
		this.props = { ...this.props, ...newProps };

		this.vdom = this.createVDOM();
	}

	protected setAttribute(key: string, value: string, vdom = this.vdom): void {
		(vdom as VirtualElement).attrs = { ...(vdom as VirtualElement).attrs, [key]: value };
	}

	public compileTemplate(): string {
		if (typeof this.templateHBS === 'function') {
			return this.templateHBS({ ...this.defaultProps, ...this.props });
		}
		return this.templateHBS;

	}

	public injectScript(selector: string, eventType: string, handler: (e: Event) => void, vdom?: VirtualNode): void {
		const exists = this.eventsList.some(
			(ev) => ev.selector === selector
				&& ev.eventType === eventType
				&& ev.handler === handler
		);

		if (!exists) {
			this.eventsList.push({ selector, eventType, handler });
		}

		function traverse(vnode: VirtualNode): void {
			if (typeof vnode === 'string') { return; }
			let matches = false;
			if (selector.startsWith('.')) {
				const cls = selector.slice(1);
				if (vnode.className && vnode.className.split(/\s+/).includes(cls)) { matches = true; }
			} else if (selector.startsWith('#')) {
				const id = selector.slice(1);
				if (vnode.attrs && vnode.attrs.id === id) { matches = true; }
			} else if ((vnode as any).tag === selector.toLowerCase()) { matches = true; }
			if (matches) {
				vnode.events = vnode.events || {};
				vnode.events[eventType] = handler;
			}
			vnode.children.forEach((child) => traverse(child));
		}
		if (vdom) {
			traverse(vdom);
		} else {
			traverse(this.vdom);
		}
	}

	public inject(newTemplate?: string, newStyle?: string, newEvents?: EventDescriptor[]): void {
		if (newTemplate) {
			this.templateHBS = () => newTemplate;
			this.vdom = this.createVDOM();
		}
		if (newStyle) {
			this.style += `\n${newStyle}`;
			this.vdom = injectCSSIntoVDOM(this.style, this.vdom);
		}
		if (newEvents) {
			newEvents.forEach((ev) => {
				const event: EventDescriptor = {
					selector: ev.selector,
					eventType: ev.eventType,
					handler: ev.handler
				};
				if (!this.eventsList.includes(event)) {
					this.injectScript(ev.selector, ev.eventType, ev.handler);
					this.eventsList.push(event);
				}
			});
		}
	}

	public render(mountPoint: HTMLElement): void {
		if (!this.isRendered) {
			this.root = renderVDOM(this.vdom) as HTMLElement;
			mountPoint.appendChild(this.root);
			this.isRendered = true;
		} else {
			this.update();
		}
		this.syncronize();
	}

	public forceRender(mountPoint: HTMLElement): void {
		this.isRendered = false;
		this.old_vdom = '';
		this.render(mountPoint);
	}

	public forceUpdate(): void {
		this.old_vdom = '';
	}

	public delete() {
		this.getDOM()?.remove();
		this.isRendered = false;
	}

	public getVDOM(): VirtualNode { return this.vdom; }

	public getOLD_VDOM(): VirtualNode { return this.old_vdom; }

	public setID(vdom = this.vdom) { this.setAttribute('data-vbc-id', this.id, vdom); }
}
