export type VirtualNode = VirtualElement | string;

export interface VirtualElement {
    tag: string;
    className: string;
    style?: Record<string, string>;
    attrs?: Record<string, string>;
    events?: Record<string, (e: Event)=>void>;
    children: VirtualNode[];
}

export interface EventDescriptor {
    selector: string;
    eventType: string;
    handler: (e: Event) => void;
}

export interface CSSRule {
    selector: string;
    declarations: Record<string, string>;
}

export function parseCSSRules(css: string): CSSRule[] {
    const rules: CSSRule[] = [];

    const reg = /([^{}])\{([^{}]+)\}/g;
    let match: RegExpExecArray | null;
    while( (match = reg.exec(css)) !== null ){
        const selector = match[1].trim();
        const declaration = match[2].trim();
        const declarations: Record<string, string> = {};

        declaration.split(';').forEach(decl => {
            const [prop, val] = decl.split(":");
            if(prop && val){
                const camelCaseProp = prop.trim().replace(/-([a-z])/g, (_, char) => char.toUpperCase());
                declarations[camelCaseProp] = val.trim();
            }
        });
        rules.push({selector, declarations});
    }
    return rules;
}

export function matchesSelector(vnode: VirtualElement, selector: string){
    if(selector.startsWith('.')){
        const cls = selector.slice(1);
        return vnode.className ? vnode.className.split(/\s+/).includes(cls) : false;
    }else if(selector.startsWith('#')){
    }
}

export function RTV(vnode: VirtualNode, rule: CSSRule): void {
    if(typeof vnode === 'string') return;
}

export function parseHTML(htmlString: string): VirtualNode{
    const template = document.createElement("template");
    template.innerHTML = htmlString;
    const element = template.content.firstChild;

    if(!element)
        console.error("Элемент не создан!");

    function parseElement(el: ChildNode): VirtualNode{
        if(el.nodeType == Node.TEXT_NODE)
            return el.textContent?.trim() || '';

        const htmlEl = el as HTMLElement;

        return {
            tag: htmlEl.tagName.toLowerCase(),
            className: htmlEl.className,
            style: htmlEl.getAttribute('style') ? parseStyle(htmlEl.getAttribute('style')!) : undefined,
            attrs: Array.from(htmlEl.attributes).reduce((acc, attr)=>{
                if(attr.name !== 'style' && attr.name !== 'class')
                    acc[attr.name] = attr.value;
                return acc;
            }, {} as Record<string, string>),
            children: Array.from(htmlEl.childNodes).map(parseElement),
        };
    }

    return parseElement(element as ChildNode);
}

export function parseStyle(styleString: string): Record<string, string>{
    return styleString.split(";").reduce((acc, rule) => {
        const [prop, value] = rule.split(':');
        if(prop && value)
            acc[prop.trim()] = value.trim();
        return acc;
    }, {} as Record<string, string>);
}

export function renderVDOM(virtual: VirtualNode): Node {
    if(typeof virtual === 'string')
        return document.createTextNode(virtual);

    const el = document.createElement(virtual.tag);
    if(virtual.className)
        el.className = virtual.className;

    if(virtual.style)
        for(const [prop, value] of Object.entries(virtual.style))
            (el.style as any)[prop] = value;
    
    if(virtual.attrs)
        for(const [prop, value] of Object.entries(virtual.attrs))
            el.setAttribute(prop, value);

    if(virtual.events)
        for(const [prop, value] of Object.entries(virtual.events))
            el.addEventListener(prop, value);

    for(const child of virtual.children)
        el.appendChild(renderVDOM(child));

    return el;
}

export function diff(oldTree: VirtualNode, newTree: VirtualNode): VirtualNode{
    if(typeof oldTree !== typeof newTree)
        return newTree;

    if(typeof oldTree == 'string' && typeof newTree == 'string')
        return newTree;

    if((oldTree as VirtualElement).tag !== (newTree as VirtualElement).tag)
        return newTree;

    const oldEL = oldTree as VirtualElement;
    const newEl = newTree as VirtualElement;

    newEl.attrs = {...oldEL.attrs, ...newEl.attrs};
    newEl.style = {...oldEL.style, ...newEl.style};
    newEl.className = newEl.className ?? oldEL.className;
    newEl.events = {...oldEL.events, ...newEl.events};

    const max = Math.max(newEl.children.length, oldEL.children.length);
    const newChildren: VirtualNode[] = [];

    for(let i = 0; i < max; i++){
        if(!oldEL.children[i])
            newChildren.push(newEl.children[i]);
        else if (!newEl.children[i])
            continue;
        else
            newChildren.push(diff(oldEL.children[i], newEl.children[i]));
    }

    newEl.children = newChildren;
    return newEl;
}