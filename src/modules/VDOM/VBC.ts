import { VirtualNode, parseHTML, renderVDOM, diff, injectCSSIntoVDOM, EventDescriptor } from "./utils";

export type TemplateProvider = string | ((props?: any) => string);

export class VBC<P = {}> {
  protected props: P;
  protected defaultProps: Partial<P>;
  protected templateHBS: TemplateProvider;
  protected style: string;
  protected eventsList: EventDescriptor[];
  protected vdom: VirtualNode;
  protected root?: HTMLElement;

  constructor(
    templateOrHBS: TemplateProvider,
    defaultProps: Partial<P> = {},
    style: string = "",
    eventsList: EventDescriptor[] = [],
    props?: P
  ) {
    this.defaultProps = defaultProps;
    this.props = { ...this.defaultProps, ...props } as P;
    this.templateHBS = templateOrHBS;
    this.style = style;
    this.eventsList = eventsList;
    const compiledHTML = this.compileTemplate();
    this.vdom = parseHTML(compiledHTML);
    this.vdom = injectCSSIntoVDOM(this.style, this.vdom);
    this.eventsList.forEach(ev => this.injectScript(ev.selector, ev.eventType, ev.handler));
  }

  protected compileTemplate(): string {
    if (typeof this.templateHBS === "function") {
      return this.templateHBS({ ...this.defaultProps, ...this.props });
    } else {
      return this.templateHBS;
    }
  }

  public injectScript(selector: string, eventType: string, handler: (e: Event) => void): void {
    function traverse(vnode: VirtualNode): void {
      if (typeof vnode === "string") return;
      let matches = false;
      if (selector.startsWith('.')) {
        const cls = selector.slice(1);
        if (vnode.className && vnode.className.split(/\s+/).includes(cls)) matches = true;
      } else if (selector.startsWith('#')) {
        const id = selector.slice(1);
        if (vnode.attrs && vnode.attrs['id'] === id) matches = true;
      } else {
        if ((vnode as any).tag === selector.toLowerCase()) matches = true;
      }
      if (matches) {
        vnode.events = vnode.events || {};
        vnode.events[eventType] = handler;
      }
      vnode.children.forEach(child => traverse(child));
    }
    traverse(this.vdom);
  }

  public inject(newTemplate?: string, newStyle?: string, newEvents?: EventDescriptor[]): void {
    if (newTemplate) {
      this.templateHBS = () => newTemplate;
      const compiledHTML = this.compileTemplate();
      this.vdom = parseHTML(compiledHTML);
    }
    if (newStyle) {
      this.style += "\n" + newStyle;
      this.vdom = injectCSSIntoVDOM(this.style, this.vdom);
    }
    if (newEvents) {
      newEvents.forEach(ev => this.injectScript(ev.selector, ev.eventType, ev.handler));
    }
  }

  public render(mountPoint: HTMLElement): void {
    if (!this.root) {
      this.root = renderVDOM(this.vdom) as HTMLElement;
      mountPoint.appendChild(this.root);
    } else {
      const compiledHTML = this.compileTemplate();
      const newVDOM = parseHTML(compiledHTML);
      const updatedVDOM = diff(this.vdom, newVDOM);
      const newRoot = renderVDOM(updatedVDOM) as HTMLElement;
      mountPoint.replaceChild(newRoot, this.root);
      this.root = newRoot;
      this.vdom = newVDOM;
    }
  }

  public getVDOM(): VirtualNode {
    return this.vdom;
  }
}
