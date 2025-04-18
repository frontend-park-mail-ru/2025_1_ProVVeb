import templateHBS from './dotsMenu.hbs';
import BaseComponent from '@basecomp';
import api from '@network';
import router, { AppPage } from '@router';

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
					.then((response) => {
						// console.log('Выход выполнен успешно:', response);
						router.navigateTo(AppPage.Auth);
					})
					.catch((error) => {
						console.error('Ошибка при выходе:', error);
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
