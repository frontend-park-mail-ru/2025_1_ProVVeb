// Compounder.ts
import { VBC } from "./VBC";
import { VirtualNode, renderVDOM, VirtualElement, parseStyle } from "./utils";

export class Compounder {
  private root: VirtualNode;
  private current: VirtualElement;
  private mountPoint?: HTMLElement;
  private stack: VirtualElement[];

  constructor() {
    this.root = { tag: "div", children: [] };
    this.current = this.root as VirtualElement;
    this.stack = [];
  }

  public add(component: VBC): void {
    this.current.children.push(component.getVDOM());
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
  }

  public up(): void {
    if (this.stack.length > 0) {
      this.current = this.stack.pop() as VirtualElement;
    }
  }

  public clear(): void {
    this.root = { tag: "div", children: [] };
    this.current = this.root as VirtualElement;
    this.stack = [];
    if (this.mountPoint) {
      this.mountPoint.innerHTML = "";
    }
  }

  public addTo(mountPoint: HTMLElement): void {
    this.mountPoint = mountPoint;
    mountPoint.appendChild(renderVDOM(this.root));
  }


  public render(mountPoint: HTMLElement): void {
    this.mountPoint = mountPoint;
    mountPoint.innerHTML = "";
    mountPoint.appendChild(renderVDOM(this.root));
  }

  public getTree(): VirtualNode {
    return this.root;
  }

  public getTemplate(): string {
    return (renderVDOM(this.root) as HTMLElement).outerHTML;
  }
}
