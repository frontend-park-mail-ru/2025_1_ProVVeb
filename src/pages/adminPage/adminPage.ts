import HeaderMain from '@compound/headerMain/headerMain';
import NavMenu from '@compound/navMenu/navMenu';
import { Compounder } from '@VDOM/Compounder';
import BasePage from '../BasePage';
import { VAdminComp } from './adminComp/adminComp';
import { VAdminCSAT } from './adminCSAT/adminCSAT';
import { VOption } from '@ui/option/option';
import { CSS_center } from '@vstyles';
import { VirtualElement } from '@VDOM/utils';
import api from '@network';
import store from '@store';
import Notification from '@simple/notification/notification';
import { statistic_params, VAdminStat } from './adminStat/adminStat';

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

		const complaintsOption = new VOption('Жалобы');
		const feedbackOption = new VOption('Отзывы');
		const statisticOption = new VOption('Статистика');

		complaintsOption.inject(undefined, '', [{
			selector: '.option',
			eventType: 'click',
			handler: async () => {
				if (complaintsOption.getDOM()?.classList.contains('option-checked')) return;

				const complaintsData = await api.findComplaints();

				if (!complaintsData.success) {
					new Notification({
						headTitle: 'Ошибка сети',
						title: 'Не удалось получить данные: проверь подключение)',
						isWarning: false,
						isWithButton: true,
					}).render();
					return;
				}

				if (complaintsData.data.complaints === null) {
					new Notification({
						headTitle: 'Жалобы не найдены',
						title: 'С текущими параметрами не найдено жалоб',
						isWarning: false,
						isWithButton: true,
					}).render();
					return;
				}

				const pageComp = new VAdminComp(complaintsData.data.complaints as []);
				complaintsOption.getDOM()?.classList.add('option-checked');
				statisticOption.getDOM()?.classList.remove('option-checked');
				feedbackOption.getDOM()?.classList.remove('option-checked');

				const link = ((this.main.getVDOM() as VirtualElement).children[0] as VirtualElement).children;
				if (link.length == 2) link.pop();

				this.main.add(pageComp);
				this.main.update(true);
			}
		}]);

		feedbackOption.inject(undefined, '', [{
			selector: '.option',
			eventType: 'click',
			handler: async () => {
				if (feedbackOption.getDOM()?.classList.contains('option-checked')) return;

				const feedbacksData = await api.findQueries();

				if (!feedbacksData.success) {
					new Notification({
						headTitle: 'Ошибка сети',
						title: 'Не удалось получить данные: проверь подключение)',
						isWarning: false,
						isWithButton: true,
					}).render();
					return;
				}

				if (feedbacksData.data.answers === null) {
					new Notification({
						headTitle: 'Нет данных',
						title: 'Отзывы не найдены',
						isWarning: false,
						isWithButton: true,
					}).render();
					feedbacksData.data.answers = [];
				}

				const pageCSAT = new VAdminCSAT(feedbacksData.data.answers as []);
				complaintsOption.getDOM()?.classList.remove('option-checked');
				statisticOption.getDOM()?.classList.remove('option-checked');
				feedbackOption.getDOM()?.classList.add('option-checked');

				const link = ((this.main.getVDOM() as VirtualElement).children[0] as VirtualElement).children;
				if (link.length == 2) link.pop();

				this.main.add(pageCSAT);
				this.main.update(true);
			}
		}]);

		statisticOption.inject(undefined, '', [{
			selector: '.option',
			eventType: 'click',
			handler: async () => {
				if (statisticOption.getDOM()?.classList.contains('option-checked')) return;

				const statisticData = await api.getStat();

				if (!statisticData.success) {
					new Notification({
						headTitle: 'Ошибка сети',
						title: 'Не удалось получить данные: проверь подключение или ты просто не админ)',
						isWarning: false,
						isWithButton: true,
					}).render();
					return;
				}

				const pageStat = new VAdminStat(statisticData.data as statistic_params);
				complaintsOption.getDOM()?.classList.remove('option-checked');
				feedbackOption.getDOM()?.classList.remove('option-checked');
				statisticOption.getDOM()?.classList.add('option-checked');

				const link = ((this.main.getVDOM() as VirtualElement).children[0] as VirtualElement).children;
				if (link.length == 2) link.pop();

				this.main.add(pageStat);
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
		this.main.add(complaintsOption);
		this.main.add(feedbackOption);
		this.main.add(statisticOption);
		this.main.up();
		this.main.setID();

		store.subscribe('newDataForAdminComp', (data) => {
			const pageComp = new VAdminComp(data as []);

			const link = ((this.main.getVDOM() as VirtualElement).children[0] as VirtualElement).children;
			if (link.length == 2) link.pop();

			this.main.add(pageComp);
			this.main.update(true);
		});

		store.subscribe('newDataForAdminCSAT', (data) => {
			const pageCSAT = new VAdminCSAT(data as []);

			const link = ((this.main.getVDOM() as VirtualElement).children[0] as VirtualElement).children;
			if (link.length == 2) link.pop();

			this.main.add(pageCSAT);
			this.main.update(true);
		});
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
