import HeaderMain from '@compound/headerMain/headerMain';
import NavMenu from '@compound/navMenu/navMenu';
import BasePage from '../BasePage';
import { VBanner } from '@features/plan/plan';
import { VPlan } from '@ui/banner/banner_shop/banner_shop';
import { Compounder } from '@VDOM/Compounder';

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
		this.plan1 = new VPlan("1 месяц", 1000, 1000, 0, "#A952EA");
		this.plan2 = new VPlan("6 месяцев", 1000, 800, 15, "#F1D373");
		this.plan3 = new VPlan("1 год", 1000, 625, 60, "#6FE7C1");

		this.main = new Compounder();
		this.main.down('mainContent__central', `
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 665px;
			`);
		this.main.add(this.banner);
		this.main.down('plans', `
				display: flex;
				flex-direction: row;
				width: 100%;
				justify-content: space-between;
				align-items: center;
			`);
		this.main.add(this.plan1).add(this.plan2).add(this.plan3);
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
