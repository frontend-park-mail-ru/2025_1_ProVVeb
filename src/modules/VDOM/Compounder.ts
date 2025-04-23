import { VBC } from "./VBC";
import { VirtualNode, VirtualElement, renderVDOM } from "./utils";

export class Compounder {
    private stack: VirtualNode[] = [];
    private current?: VirtualElement;

    constructor(){ this.stack = [] }

    add(component: VBC){
        if(!this.current){
            this.current = {
                tag: 'div',
                className: '',
                children: [],
            };
        }
        this.current?.children.push(component['vdom']);
    }

    public down(className?: string): void {
        const newBlock: VirtualElement = {
            tag: 'div',
            className: className as string,
            children: [],
        };
        if(this.current){
            this.current.children.push(newBlock);
            this.stack.push(this.current);
        }
        this.current = newBlock;
    }

    public up(): void{
        if(this.stack.length > 0)
            this.current = this.stack.pop() as VirtualElement;
    }

    public render(mountPoint: HTMLElement): void{
        if(this.current)
            mountPoint.appendChild(renderVDOM(this.current));
    }
}