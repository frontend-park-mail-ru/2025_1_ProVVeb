import HeaderMain from '@compound/headerMain/headerMain';
import NavMenu from '@compound/navMenu/navMenu';
import ProfileInfo from '@compound/profileInfo/profileInfo';
import BasePage from '../BasePage';

export default class ProfilePage extends BasePage {
	private components: Array<HeaderMain | NavMenu | ProfileInfo>;

	private contentWrapper: HTMLElement;

	constructor(parentElement: HTMLElement) {
		super(parentElement);

		this.contentWrapper = document.createElement('div');
		this.contentWrapper.className = 'mainContent';

		this.components = [
			new HeaderMain(parentElement),
			new NavMenu(this.contentWrapper),
			new ProfileInfo(this.contentWrapper),
		];
	}

	render(): void {
		this.contentWrapper.innerHTML = '';
		this.components[0].render();

		this.parentElement.appendChild(this.contentWrapper);
		for (let i = 1; i < this.components.length; i++) {
			this.components[i].render();
		}
	}

	public getNavMenu(): NavMenu {
		return this.components[1] as NavMenu;
	}
}
