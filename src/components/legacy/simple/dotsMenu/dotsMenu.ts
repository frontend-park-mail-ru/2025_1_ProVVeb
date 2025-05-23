import BaseComponent from '@basecomp';
import api from '@network';
import router, { AppPage } from '@router';
import store from '@store';
import Notification from '@notification';
import templateHBS from './dotsMenu.hbs';

interface DotsMenuParams {
	idDotsMenu: string;
}

const DEFAULT_PARAMS_DOTS_MENU: DotsMenuParams = {
	idDotsMenu: '',
};

interface LinkConfig {
	title: string;
	id: string;
	listener: {
		eventType: string;
		selector: string;
		callback: () => void;
	};
}

const LINKS: LinkConfig[] = [
	{
		title: 'Выход',
		id: 'logoutLink',
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: () => {
				api.logoutUser()
					.then(() => {
						store.setState('inSession', false);
						router.navigateTo(AppPage.Auth);
					})
					.catch(() => {
						new Notification({
							headTitle: 'Что-то пошло не так...',
							title: 'Ошибка сервера. Попробуйте позже',
							isWarning: false,
							isWithButton: true
						}).render();
					});
			},
		},
	}
];

export default class DotsMenu extends BaseComponent {
	constructor(parentElement: HTMLElement, paramsHBS: Partial<DotsMenuParams> = {}) {
		const finalParamsHBS = { ...DEFAULT_PARAMS_DOTS_MENU, ...paramsHBS };
		const templateHTML = templateHBS({ ...finalParamsHBS, links: LINKS });
		super(templateHTML, parentElement);

		LINKS.forEach((link) => {
			this.addListener(
				link.listener.eventType,
				link.listener.selector.replace('#{id}', `#${link.id}`),
				link.listener.callback
			);
		});
	}
}
