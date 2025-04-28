import { 
  VirtualNode, 
  parseHTML, 
  renderVDOM, 
  diff, 
  injectCSSIntoVDOM, 
  EventDescriptor, 
  VirtualElement 
} from "./utils";

export type TemplateProvider = string | ((props?: any) => string);

export class VBC<P = {}> {
  protected isRendered: boolean;
  protected props: P;
  protected defaultProps: Partial<P>;
  protected templateHBS: TemplateProvider;
  protected style: string;
  protected eventsList: EventDescriptor[];
  protected vdom: VirtualNode;
  protected root?: HTMLElement;
  public point?: HTMLElement;
  private readonly id: string;
  private domElement: HTMLElement | null = null;

  constructor(
    templateOrHBS: TemplateProvider,
    defaultProps: Partial<P> = {},
    style: string = "",
    eventsList: EventDescriptor[] = [],
    props?: P
  ) {
    this.id = `vbc-${Math.random().toString(36).slice(2, 11)}`;

    this.defaultProps = defaultProps;
    this.props = { ...this.defaultProps, ...props } as P;
    this.templateHBS = templateOrHBS;
    this.style = style;
    this.eventsList = eventsList;
    const compiledHTML = this.compileTemplate();
    this.vdom = parseHTML(compiledHTML);
    this.vdom = injectCSSIntoVDOM(this.style, this.vdom);
    this.eventsList.forEach(ev => this.injectScript(ev.selector, ev.eventType, ev.handler));

    this.root = renderVDOM(this.vdom) as HTMLElement;
    this.isRendered = false;

    this.setAttribute('data-vbc-id', this.id);
  }

  public getDOM(): HTMLElement | null {
    if (this.domElement && document.contains(this.domElement)) {
      return this.domElement;
    }
    this.domElement = document.querySelector(`[data-vbc-id="${this.id}"]`);
    return this.domElement;
  }

  public update(): void{
    const mountPoint = this.getDOM()?.parentElement as HTMLElement;

    // const activeElement = document.activeElement as HTMLElement;

    const compiledHTML = this.compileTemplate();
    const newVDOM = parseHTML(compiledHTML);
    this.setAttribute('data-vbc-id', this.id);
    const newRoot = renderVDOM(this.vdom) as HTMLElement;
    if(mountPoint)
      mountPoint.replaceChild(newRoot, this.getDOM() as HTMLElement);

    this.root = newRoot;
    this.vdom = newVDOM;

    // if (activeElement) {
    //   const restoredElement = this.getDOM()?.querySelector(`[data-vbc-id="${this.id}"] ${activeElement.tagName.toLowerCase()}`) as HTMLElement;
    //   if (restoredElement) restoredElement.focus();
    // }
  }

  public injectProps(newProps: Partial<P>): void {
    this.props = { ...this.props, ...newProps };

    const compiledHTML = this.compileTemplate();
    this.vdom = parseHTML(compiledHTML);
    this.vdom = injectCSSIntoVDOM(this.style, this.vdom);
    this.eventsList.forEach(ev => this.injectScript(ev.selector, ev.eventType, ev.handler));
  }

  private setAttribute(key: string, value: string): void {
    (this.vdom as VirtualElement).attrs = { ...(this.vdom as VirtualElement).attrs, [key]: value };
  }

  public compileTemplate(): string {
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
      this.vdom = injectCSSIntoVDOM(this.style, this.vdom);
      this.eventsList.forEach(ev => this.injectScript(ev.selector, ev.eventType, ev.handler));
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
    if (!this.isRendered) {
      this.root = renderVDOM(this.vdom) as HTMLElement;
      mountPoint.appendChild(this.root);
      this.isRendered = true;
    } else {
      const compiledHTML = this.compileTemplate();
      const newVDOM = parseHTML(compiledHTML);
      const updatedVDOM = diff(this.vdom, newVDOM);
      const newRoot = renderVDOM(updatedVDOM) as HTMLElement;
      mountPoint.replaceChild(newRoot, this.root as HTMLElement);
      this.root = newRoot;
      this.vdom = newVDOM;
    }
  }

  public getVDOM(): VirtualNode {
    return this.vdom;
  }
}
