import HeaderMain from '@compound/headerMain/headerMain';
import NavMenu from '@compound/navMenu/navMenu';
import { VBanner } from '@features/plan/plan';
import { VPlan } from '@ui/banner/banner_shop/banner_shop';
import { Compounder } from '@VDOM/Compounder';
import BasePage from '../BasePage';
import store from '@store';
import { VirtualElement } from '@VDOM/utils';

export default class ShopPage extends BasePage {
	private components: Array<HeaderMain | NavMenu>;

	private contentWrapper: HTMLElement;

	private banner: VBanner;

	private plan1: VPlan;

	private plan2: VPlan;

	private plan3: VPlan;

	private main: Compounder;

	constructor(parentElement: HTMLElement) {
		super(parentElement);

		this.contentWrapper = document.createElement('div');
		this.contentWrapper.className = 'mainContent';

		this.components = [
			new HeaderMain(parentElement),
			new NavMenu(this.contentWrapper),
		];

		this.banner = new VBanner();
		this.plan1 = new VPlan('3 дня', 500, 0, 100, '#A952EA', false);
		this.plan2 = new VPlan('1 месяц', 500, 390, 22, '#F1D373', true);
		this.plan3 = new VPlan('6 месяцев', 6000, 1190, 80, '#6FE7C1', true);

		this.main = new Compounder();
		this.main.down('mainContent__central', `
				justify-content: center;
				align-items: center;
				gap: 20px;
			`);
		this.main.add(this.banner);

		this.main.down('plans', `
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				width: 100%;
				gap: 20px;
				justify-content: center;
				align-items: center;	
			`);
		this.main.add(this.plan1);
		this.main.add(this.plan2).add(this.plan3);
	}

	render(): void {
		this.main.delete();
		this.contentWrapper.innerHTML = '';
		this.components[0].render();
		this.parentElement.appendChild(this.contentWrapper);
		this.components[1].render();
		if (store.getState('isPremium') == true) {
			const buffer = ((this.main.getVDOM() as VirtualElement).children[0] as VirtualElement).children[1];
			const element = (buffer as VirtualElement).children;
			if (element.length == 3) element.splice(0, 1);
		}
		this.main.render(this.contentWrapper);
	}

	public getNavMenu(): NavMenu {
		return this.components[1] as NavMenu;
	}
}
