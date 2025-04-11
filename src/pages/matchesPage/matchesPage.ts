import BasePage from '../BasePage';
import HeaderMain from '@compound/headerMain/headerMain';
import NavMenu from '@compound/navMenu/navMenu';
import Interest from '@simple/interest/interest';

export default class FeedPage extends BasePage {
	private components: Array<HeaderMain | NavMenu | Interest>;
	private contentWrapper: HTMLElement;

	constructor(parentElement: HTMLElement) {
		super(parentElement);

		this.contentWrapper = document.createElement('div');
		this.contentWrapper.className = 'mainContent';

		this.components = [
			new HeaderMain(parentElement),
			new NavMenu(this.contentWrapper),
            new Interest(this.contentWrapper, {title: "Спорт"}),
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
}
