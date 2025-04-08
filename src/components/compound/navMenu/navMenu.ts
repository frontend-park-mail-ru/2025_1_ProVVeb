import templateHBS from './navMenu.hbs';
import BaseComponent from '@basecomp';
import api from '@network';
import router, { AppPage } from '@router';

interface NavMenuParams {
	idNavLink: string;
}

const DEFAULT_PARAMS_NAV_MENU: NavMenuParams = {
	idNavLink: '',
};

interface LinkConfig {
	title: string;
	srcIcon: string;
	id: string;
	listener: {
		eventType: string;
		selector: string;
		callback: () => void;
	};
}

const uniqId = '_navMenu'

const LINKS: LinkConfig[] = [
	{
		title: 'Лента',
		srcIcon: 'media/navMenu/fire.svg',
		id: 'fire' + uniqId,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: () => {
				console.log('fire');
			},
		},
	},
	{
		title: 'Настройки',
		srcIcon: 'media/navMenu/settings.svg',
		id: 'settings' + uniqId,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: () => {
				console.log('settings');
			},
		},
	},
	{
		title: 'Поиск',
		srcIcon: 'media/navMenu/search.svg',
		id: 'search' + uniqId,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: () => {
				console.log('search');
			},
		},
	},
	{
		title: 'Мессенджер',
		srcIcon: 'media/navMenu/messenger.svg',
		id: 'messenger' + uniqId,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: () => {
				console.log('messenger');
			},
		},
	},
	{
		title: 'Безопасность',
		srcIcon: 'media/navMenu/security.svg',
		id: 'security' + uniqId,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: () => {
				console.log('security');
			},
		},
	},
	{
		title: 'Магазин',
		srcIcon: 'media/navMenu/shop.svg',
		id: 'shop' + uniqId,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: () => {
				console.log('shop');
			},
		},
	},
	{
		title: 'Список мэтчей',
		srcIcon: 'media/navMenu/feature.svg',
		id: 'feature' + uniqId,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: () => {
				console.log('feature');
			},
		},
	},
];

export default class NavMenu extends BaseComponent {
	constructor(parentElement: HTMLElement, paramsHBS: Partial<NavMenuParams> = {}) {
		const finalParamsHBS = { ...DEFAULT_PARAMS_NAV_MENU, ...paramsHBS };
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
