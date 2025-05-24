import { VBC } from '@modules/VDOM/VBC';
import templateHBS from './catalog.hbs';

export interface CatalogOption {
	text: string;
	value: string;
}

export interface VCatalogProps {
	placeholder: string;
	listVisible: boolean;
	options: CatalogOption[];
}

export class VCatalog extends VBC<VCatalogProps> {
	private clickOutsideHandler?: (e: MouseEvent) => void;

	constructor(props?: VCatalogProps) {
		const defaultProps: VCatalogProps = {
			placeholder: 'Select an option',
			listVisible: false,
			options: [
				{ text: 'Option 1', value: '1' },
				{ text: 'Option 2', value: '2' },
				{ text: 'Option 3', value: '3' }
			]
		};

		super(
			templateHBS,
			{ ...defaultProps, ...props },
			'',
			[
				{
					selector: '.catalog__selected',
					eventType: 'click',
					handler: () => this.toggleList()
				},
				{
					selector: '.catalog__option',
					eventType: 'click',
					handler: (e: Event) => this.handleOptionClick(e)
				}
			],
			props
		);
	}

	private toggleList(visible?: boolean) {
		const newProps = {
			...this.props,
			listVisible: visible !== undefined ? visible : !this.props.listVisible
		};

		if (newProps.listVisible) {
			this.addClickOutsideListener();
		} else {
			this.removeClickOutsideListener();
		}

		this.injectProps(newProps);
		this.update();
	}

	private handleOptionClick(e: Event) {
		const target = e.currentTarget as HTMLElement;
		const newText = target.dataset.text;
		if (newText) {
			const newProps = {
				...this.props,
				placeholder: newText,
				listVisible: false
			};

			this.injectProps(newProps);
			this.update();
			this.removeClickOutsideListener();
		}
	}

	private addClickOutsideListener() {
		this.clickOutsideHandler = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const componentDOM = this.getDOM();
			if (componentDOM && !componentDOM.contains(target)) {
				this.toggleList(false);
			}
		};

		document.addEventListener('click', this.clickOutsideHandler);
	}

	private removeClickOutsideListener() {
		if (this.clickOutsideHandler) {
			document.removeEventListener('click', this.clickOutsideHandler);
			this.clickOutsideHandler = undefined;
		}
	}
}
