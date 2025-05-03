import { VBC } from "./VBC";
import { VirtualNode, renderVDOM, VirtualElement, parseStyle } from "./utils";

export class Compounder extends VBC {
	private root_: VirtualNode;
	private current: VirtualElement;
	private mountPoint?: HTMLElement;
	private stack: VirtualElement[];

	constructor() {
		//Добавить пропсы
		super('<div></div>');

		this.root_ = { tag: "div", style: { 'display': 'contents' }, children: [] };
		this.current = this.root_ as VirtualElement;
		this.stack = [];
	}

	public add(component: VBC): void {
		this.current.children.push(component.getVDOM());

		this.vdom = this.root_;
	}

	public down(arg: string | VirtualElement, inlineStyle?: string, tag?: string): void {
		let newBlock: VirtualElement;
		if (typeof arg === "string") {
			const TAG = tag || "div"
			newBlock = { tag: TAG, className: arg, children: [] };
			if (inlineStyle) {
				newBlock.style = parseStyle(inlineStyle);
			}
		} else {
			newBlock = arg;
		}
		this.current.children.push(newBlock);
		this.stack.push(this.current);
		this.current = newBlock;

		this.vdom = this.root_;
	}

	public up(): void {
		if (this.stack.length > 0) {
			this.current = this.stack.pop() as VirtualElement;
		}
	}

	public clear(): void {
		this.root_ = { tag: "div", children: [] };
		this.current = this.root_ as VirtualElement;
		this.stack = [];
	}

	public addTo(mountPoint: HTMLElement): void {
		this.mountPoint = mountPoint;
		this.root = renderVDOM(this.root_) as HTMLElement;
		mountPoint.appendChild(this.root);
		this.isRendered = true;
	}

	public render(mountPoint: HTMLElement): void {
		if (!this.isRendered) {
			this.root = renderVDOM(this.vdom) as HTMLElement;
			mountPoint.appendChild(this.root);
			this.isRendered = true;
		} else {
			const newRoot = renderVDOM(this.vdom) as HTMLElement;
			mountPoint.replaceChild(newRoot, this.root as HTMLElement);
			this.root = newRoot;
		}
	}

	public getTemplate(): string {
		return (renderVDOM(this.root_) as HTMLElement).outerHTML;
	}

}
