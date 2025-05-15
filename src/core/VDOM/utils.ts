export type VirtualNode = VirtualElement | string;

export interface VirtualElement {
	tag: string;
	className?: string;
	style?: Record<string, string>;
	attrs?: Record<string, string>;
	events?: Record<string, (e: Event) => void>;
	children: VirtualNode[];
}

export interface CSSRule {
	selector: string;
	declarations: Record<string, string>;
}

export interface EventDescriptor {
	selector: string;
	eventType: string;
	handler: (e: Event) => void;
}

function applyRuleToVDOM(vnode: VirtualNode, rule: CSSRule): void {
	if (typeof vnode === 'string') { return; }
	if (matchesSelector(vnode, rule.selector)) {
		vnode.style = { ...(vnode.style || {}), ...rule.declarations };
	}
	vnode.children.forEach((child) => applyRuleToVDOM(child, rule));
}

export function injectCSSIntoVDOM(css: string, vdom: VirtualNode): VirtualNode {
	const rules = parseCSSRules(css);
	rules.forEach((rule) => {
		applyRuleToVDOM(vdom, rule);
	});
	return vdom;
}

export function parseCSSRules(css: string): CSSRule[] {
	const rules: CSSRule[] = [];
	const regex = /([^{}]+)\{([^{}]+)\}/g;
	let match: RegExpExecArray | null;
	while ((match = regex.exec(css)) !== null) {
		const selector = match[1].trim();
		const declarations = parseStyle(match[2].trim());
		rules.push({ selector, declarations });
	}
	return rules;
}

export function matchesSelector(vnode: VirtualElement, selector: string): boolean {
	if (selector.startsWith('.')) {
		const cls = selector.slice(1);
		return vnode.className ? vnode.className.split(/\s+/).includes(cls) : false;
	} if (selector.startsWith('#')) {
		const id = selector.slice(1);
		return (vnode.attrs && vnode.attrs.id === id) as boolean;
	}
	return vnode.tag === selector.toLowerCase();

}

export function parseStyle(styleString: string): Record<string, string> {
	return Object.fromEntries(
		styleString
			.split(';')
			.map(rule => rule.split(':').map(x => x.trim()))
			.filter(([prop, val]) => prop && val)
			.map(([prop, val]) => [
				prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase()),
				val,
			])
	);
}

export function parseHTML(htmlString: string): VirtualNode {
	const template = document.createElement('template');
	template.innerHTML = htmlString.trim();
	const element = template.content.firstElementChild;
	if (!element) { throw new Error('Неверный HTML шаблон!'); }

	function parseElement(el: ChildNode): VirtualNode {
		if (el.nodeType === Node.TEXT_NODE) {
			return el.textContent?.trim() || '';
		}
		const htmlEl = el as HTMLElement;
		return {
			tag: htmlEl.tagName.toLowerCase(),
			className: htmlEl.className || undefined,
			style: htmlEl.getAttribute('style') ? parseStyle(htmlEl.getAttribute('style')!) : undefined,
			attrs: Array.from(htmlEl.attributes).reduce((acc, attr) => {
				if (attr.name !== 'style' && attr.name !== 'class') {
					acc[attr.name] = attr.value;
				}
				return acc;
			}, {} as Record<string, string>),
			events: {},
			children: Array.from(htmlEl.childNodes).map(parseElement)
		};
	}

	return parseElement(element);
}

export function renderVDOM(virtual: VirtualNode): Node {
	if (typeof virtual === 'string') { return document.createTextNode(virtual); }
	const el = document.createElement(virtual.tag);
	if (virtual.className) { el.className = virtual.className; }

	if (virtual.style) {
		for (const [prop, value] of Object.entries(virtual.style)) {
			(el.style as any)[prop] = value;
		}
	}
	if (virtual.attrs) {
		for (const [attr, value] of Object.entries(virtual.attrs)) {
			el.setAttribute(attr, value);
		}
	}
	if (virtual.events) {
		for (const [event, handler] of Object.entries(virtual.events)) {
			el.addEventListener(event, handler);
		}
	}
	virtual.children.forEach((child) => {
		el.appendChild(renderVDOM(child));
	});
	return el;
}

export function patchVDOM(oldVNode: VirtualNode, newVNode: VirtualNode, domNode: Node): void {
	if (typeof oldVNode === 'string' && typeof newVNode === 'string') {
		if (oldVNode !== newVNode && domNode.nodeType === Node.TEXT_NODE) {
			(domNode as Text).textContent = newVNode;
		}
		return;
	}
	if (typeof oldVNode !== typeof newVNode) {
		const newDom = renderVDOM(newVNode);
		domNode.parentNode?.replaceChild(newDom, domNode);
		return;
	}

	oldVNode = oldVNode as VirtualElement;
	newVNode = newVNode as VirtualElement;

	if (oldVNode.tag !== newVNode.tag) {
		const newDom = renderVDOM(newVNode);
		domNode.parentNode?.replaceChild(newDom, domNode);
		return;
	}

	const element = domNode as HTMLElement;
	if (oldVNode.className !== newVNode.className) {
		element.className = newVNode.className as string;
	}

	const oldStyle = oldVNode.style || {};
	const newStyle = newVNode.style || {};
	if (JSON.stringify(oldStyle) !== JSON.stringify(newStyle)) {
		element.style.cssText = '';
		for (const [prop, value] of Object.entries(newStyle)) {
			(element.style as any)[prop] = value;
		}
	}

	const oldChildren = [];
	for (const el of oldVNode.children) { if (el !== '') { oldChildren.push(el); } }

	const newChildren = [];
	for (const el of newVNode.children) { if (el !== '') { newChildren.push(el); } }

	const domChildNodes = [];
	for (const el of element.childNodes) {
		if (!(el.textContent == '' && el.nodeType == Node.TEXT_NODE)) {
			domChildNodes.push(el);
		}
	}

	const max = Math.max(oldChildren.length, newChildren.length);

	for (let i = 0; i < max; i++) {
		if (i >= oldChildren.length) {
			element.appendChild(renderVDOM(newChildren[i] as VirtualNode));
		} else if (i >= newChildren.length) {
			element.removeChild(domChildNodes[i]);
		} else if (domChildNodes[i]) {
			patchVDOM(oldChildren[i] as VirtualNode, newChildren[i] as VirtualNode, domChildNodes[i]);
		}
	}
}
