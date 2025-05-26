import { VBC } from './VBC';
import {
	VirtualNode, renderVDOM, VirtualElement, parseStyle, patchVDOM
} from './utils';

export class Compounder extends VBC {
	private root_: VirtualNode;

	private current: VirtualElement;

	private mountPoint?: HTMLElement;

	private stack: VirtualElement[];

	constructor() {
		super('<div></div>');

		this.root_ = {
			tag: 'div',
			style: {
				display: 'contents'
			},
			children: []
		};
		this.current = this.root_ as VirtualElement;
		this.stack = [];
		this.vdom = this.root_;
	}

	public add(component: VBC): this {
		this.current.children.push(component.getVDOM());
		return this;
	}

	public addToStart(component: VBC): this {
		this.current.children.unshift(component.getVDOM());
		return this;
	}

	public down(arg: string | VirtualElement, inlineStyle?: string, tag?: string): this {
		const newBlock: VirtualElement =			typeof arg === 'string'
			? {
				tag: tag || 'div', className: arg, style: inlineStyle ? parseStyle(inlineStyle) : {}, children: []
			}
			: arg;
		this.current.children.push(newBlock);
		this.stack.push(this.current);
		this.current = newBlock;

		return this;
	}

	public up(): this {
		if (this.stack.length > 0) {
			this.current = this.stack.pop() as VirtualElement;
		}
		return this;
	}

	public clear(): this {
		this.root_ = {
			tag: 'div',
			style: {
				display: 'contents'
			},
			children: []
		};
		this.current = this.root_ as VirtualElement;
		this.stack = [];
		this.vdom = this.root_;
		return this;
	}

	public addTo(mountPoint: HTMLElement): void {
		this.mountPoint = mountPoint;
		this.root = renderVDOM(this.root_) as HTMLElement;
		mountPoint.appendChild(this.root);
		this.isRendered = true;
	}

	public render(mountPoint: HTMLElement): void {
		this.mountPoint = mountPoint;
		if (!this.isRendered) {
			this.root = renderVDOM(this.vdom) as HTMLElement;
			mountPoint.appendChild(this.root);
			this.isRendered = true;
		} else {
			const newRoot = renderVDOM(this.vdom) as HTMLElement;
			mountPoint.replaceChild(newRoot, this.root as HTMLElement);
			this.root = newRoot;
		}
		this.syncronize();
	}

	public getTemplate(): string {
		return (renderVDOM(this.root_) as HTMLElement).outerHTML;
	}

	public forceRender(mountPoint: HTMLElement): void {
		this.isRendered = false;
		this.render(mountPoint);
	}
}
