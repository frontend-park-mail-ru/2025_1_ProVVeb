import HeaderMain from '@compound/headerMain/headerMain';
import NavMenu from '@compound/navMenu/navMenu';
import BasePage from '../BasePage';

export default class EmptyPage extends BasePage {
	private components: Array<HeaderMain | NavMenu>;

	private contentWrapper: HTMLElement;

	constructor(parentElement: HTMLElement) {
		super(parentElement);

		this.contentWrapper = document.createElement('div');
		this.contentWrapper.className = 'mainContent';

		this.components = [
			new HeaderMain(parentElement),
			new NavMenu(this.contentWrapper),
		];
	}

	render(): void {
		this.contentWrapper.innerHTML = '';
		this.components[0].render();

		this.parentElement.appendChild(this.contentWrapper);
		for (let i = 1; i < this.components.length; i++) {
			this.components[i].render();
		}
		this.contentWrapper.insertAdjacentHTML('beforeend', '<p>В стадии разработки...</p>');
	}

	public getNavMenu(): NavMenu {
		return this.components[1] as NavMenu;
	}
}
