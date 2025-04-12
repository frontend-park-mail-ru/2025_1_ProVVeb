import BasePage from '../BasePage';
import HeaderMain from '@compound/headerMain/headerMain';
import NavMenu from '@compound/navMenu/navMenu';
import MatchesCards from '@compound/matchesCards/matchesCards';

export default class MatchesPage extends BasePage {
	private components: Array<HeaderMain | NavMenu | MatchesCards>;
	private contentWrapper: HTMLElement;

	constructor(parentElement: HTMLElement) {
		super(parentElement);

		this.contentWrapper = document.createElement('div');
		this.contentWrapper.className = 'mainContent';

		this.components = [
			new HeaderMain(parentElement),
			new NavMenu(this.contentWrapper),
			new MatchesCards(this.contentWrapper),
		];
	}

	render(): void {
		this.contentWrapper.innerHTML = '';
		this.components[0].render(); // HeaderMain

		this.parentElement.appendChild(this.contentWrapper);
		for (let i = 1; i < this.components.length; i++) {
			this.components[i].render();
		}

		this.contentWrapper.style.border = '1px solid red'; // Уберите это в продакшене
	}

	public getNavMenu() : NavMenu{
		return this.components[1] as NavMenu;
	}
}
