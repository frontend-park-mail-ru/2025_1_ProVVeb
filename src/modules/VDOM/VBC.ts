import { parseHTML, renderVDOM, diff, VirtualNode, EventDescriptor } from "./utils";

export abstract class VBC {
    protected template: string;
    protected style?: string;
    protected vdom!: VirtualNode;
    protected root?: HTMLElement;
    protected eventList?: EventDescriptor[];

    constructor(template: string, style: string = '', eventList: EventDescriptor[] = []){
        this.template = template;
        this.style = style;
        this.eventList = eventList;

        this.vdom = parseHTML(template);

        this.injectStyle();
        this.eventList?.forEach(event => { this.injectScript(event.eventType, event.selector, event.handler); });
    }

    protected updateTemplate(newTeplate: string){
        this.template = newTeplate;
        this.vdom = parseHTML(this.template);
    }

    protected injectStyle(): void {
        if(this.style){
            const id = `${this.constructor.name}-style`;
            if(!document.getElementById(id)){
                const styleTag = document.createElement('style');
                styleTag.id = id;
                styleTag.innerHTML = this.style;
                document.head.appendChild(styleTag);
            }
        }
    }

    public injectScript(selector: string, eventType: string, handler: (e: Event)=>void): void {
        function dfs(vnode: VirtualNode): void{
            if(typeof vnode == 'string') return;

            let matches = false;
            if(selector.startsWith('.')) {
                const cls = selector.slice(1);
                if(vnode.className && vnode.className.split(' ').includes(cls))
                    matches = true;
            }else if(selector.startsWith('#')){
                const id = selector.slice(1);
                if(vnode.attrs && vnode.attrs['id'] == id)
                    matches = true;
            } else {
                if(vnode.tag == selector.toLowerCase())
                    matches = true;
            }

            if(matches){
                vnode.events = vnode.events = {};
                vnode.events[eventType] = handler;
            }
            
            vnode.children.forEach(child => {
                dfs(child);
            });
        }
        dfs(this.vdom);
    }

    public getVDOM(): VirtualNode { return this.vdom; }

    render(mountPoint: HTMLElement): void {
        this.injectStyle();

        if(!this.root){
            this.root = renderVDOM(this.vdom) as HTMLElement;
            mountPoint.appendChild(this.root);
        }else{
            const newVDOM = parseHTML(this.template);
            const updatedVDOM = diff(this.vdom, newVDOM);
            const newRoot = renderVDOM(updatedVDOM) as HTMLElement;
            mountPoint.replaceChild(newRoot, this.root);
            this.root = newRoot;
            this.vdom = newVDOM;
        }
    }
}