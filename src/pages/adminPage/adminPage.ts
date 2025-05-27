import HeaderMain from '@compound/headerMain/headerMain';
import NavMenu from '@compound/navMenu/navMenu';
import { Compounder } from '@VDOM/Compounder';
import BasePage from '../BasePage';
import { VAdminComp } from './adminComp/adminComp';
import { VAdminCSAT } from './adminCSAT/adminCSAT';
import { VOption } from '@ui/option/option';
import { CSS_center } from '@vstyles';
import { VirtualElement } from '@VDOM/utils';

export default class AdminPage extends BasePage {
	private components: Array<HeaderMain | NavMenu>;

	private contentWrapper: HTMLElement;

	private main: Compounder;

	constructor(parentElement: HTMLElement) {
		super(parentElement);

		this.contentWrapper = document.createElement('div');
		this.contentWrapper.className = 'mainContent';

		this.components = [
			new HeaderMain(parentElement),
			new NavMenu(this.contentWrapper),
		];

		const option1 = new VOption('Жалобы');
		const option2 = new VOption('Отзывы');
		option1.inject(undefined, '', [{
			selector: '.option',
			eventType: 'click',
			handler: () => {
				const pageComp = new VAdminComp();
				option1.getDOM()?.classList.add('option-checked');
				option2.getDOM()?.classList.remove('option-checked');
				console.log(this.main);
				const link = ((this.main.getVDOM() as VirtualElement).children[0] as VirtualElement).children;
				if (link.length == 2) link.pop();
				this.main.add(pageComp);
				this.main.update(true);
			}
		}]);
		option2.inject(undefined, '', [{
			selector: '.option',
			eventType: 'click',
			handler: () => {
				const pageCSAT = new VAdminCSAT();
				option1.getDOM()?.classList.remove('option-checked');
				option2.getDOM()?.classList.add('option-checked');
				console.log(this.main);
				const link = ((this.main.getVDOM() as VirtualElement).children[0] as VirtualElement).children;
				if (link.length == 2) link.pop();
				this.main.add(pageCSAT);
				this.main.update(true);
			}
		}]);

		this.main = new Compounder();
		this.main.down('mainContent__central');
		this.main.down('options', `
			width: 100%;
			height: fit-content;
			flex-direction: row;
			gap: 10px;
		${CSS_center}`);
		this.main.add(option1);
		this.main.add(option2);
		this.main.up();
		this.main.setID();
	}

	render(): void {
		this.main.delete();
		this.contentWrapper.innerHTML = '';
		this.components[0].render();
		this.parentElement.appendChild(this.contentWrapper);
		this.components[1].render();
		this.main.render(this.contentWrapper);
	}

	public getNavMenu(): NavMenu {
		return this.components[1] as NavMenu;
	}
}
