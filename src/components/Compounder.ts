interface VirtualElement {
    tag: string;
    className: string;
    style: string;
    children: (VirtualElement | string)[];
}

class Compounder {
    private root: VirtualElement;

    private pointer: VirtualElement;

    constructor(rootTag: string = 'div') {
        this.root = {
            tag: rootTag, className: '', style: '', children: []
        };
        this.pointer = this.root;
    }

    public createBlock(tag: string = 'div', className: string, style: string = '') {
        const newBlock: VirtualElement = {
            tag, className, style, children: []
        };
        this.pointer.children.push(newBlock);
        this.pointer = newBlock;
    }

    public upRoot() {
        const findParent = (node: VirtualElement, target: VirtualElement): VirtualElement | null => {
            for (const child of node.children) {
                if (child === target) {
                    return node;
                }
                if (typeof child !== 'string') {
                    const result = findParent(child, target);
                    if (result) { return result; }
                }
            }
            return null;
        };
        const parent = findParent(this.root, this.pointer);
        if (parent) { this.pointer = parent; }
    }

    public addBlock(html: string) {
        this.pointer.children.push(html);
    }

    public getFinalTemplate(): string {
        const renderElement = (element: VirtualElement): string => {
            const stylePart = element.style ? ` style="${element.style}"` : '';
            const classPart = element.className ? ` class="${element.className}"` : '';
            const childrenPart = element.children.map((child) => (typeof child === 'string' ? child : renderElement(child))
            ).join('');
            return `<${element.tag}${classPart}${stylePart}>${childrenPart}</${element.tag}>`;
        };

        return renderElement(this.root);
    }
}
