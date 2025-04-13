import templateHBS from './navMenu.hbs';
import BaseComponent from '@basecomp';
import store from '@store';
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
	srcIconHover: string;
	id: string;
	listener: {
		eventType: string;
		selector: string;
		callback: (event: Event) => void;
	};
}

const uniqId = '_navMenu'
const colorOnSelect = '#1a73e8'

const LINKS: LinkConfig[] = [
	{
		title: 'Лента',
		srcIcon: 'media/navMenu/fire.svg',
		srcIconHover: 'media/navMenu/active/fire_gradient.svg',
		id: 'feed' + uniqId,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: (event) => {
				console.log('fire');
			},
		},
	},
	{
		title: 'Поиск',
		srcIcon: 'media/navMenu/search.svg',
		srcIconHover: 'media/navMenu/active/search_gradient.svg',
		id: 'search' + uniqId,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: (event) => {
				console.log('search');
			},
		},
	},
	{
		title: 'Мессенджер',
		srcIcon: 'media/navMenu/messenger.svg',
		srcIconHover: 'media/navMenu/active/messenger_gradient.svg',
		id: 'messenger' + uniqId,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: (event) => {
				console.log('messenger');
			},
		},
	},
	{
		title: 'Безопасность',
		srcIcon: 'media/navMenu/security.svg',
		srcIconHover: 'media/navMenu/active/security_gradient.svg',
		id: 'security' + uniqId,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: (event) => {
				console.log('security');
			},
		},
	},
	{
		title: 'Магазин',
		srcIcon: 'media/navMenu/shop.svg',
		srcIconHover: 'media/navMenu/active/shop_gradient.svg',
		id: 'shop' + uniqId,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: (event) => {
				console.log('shop');
			},
		},
	},
	{
		title: 'Список мэтчей',
		srcIcon: 'media/navMenu/feature.svg',
		srcIconHover: 'media/navMenu/active/feature_gradient.svg',
		id: 'matches' + uniqId,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: (event) => {
				console.log('feature');
			},
		},
	},
	{
		title: 'Настройки',
		srcIcon: 'media/navMenu/settings.svg',
		srcIconHover: 'media/navMenu/active/settings_gradient.svg',
		id: 'settings' + uniqId,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: (event) => {
				console.log('settings');
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
			// const element = document.querySelector(`#${link.id}`) as HTMLElement;
			// const img = element.querySelector('img') as HTMLImageElement;

			// element.addEventListener('mouseenter', () => {
			// 	img.src = link.srcIconHover;
			// });

			// element.addEventListener('mouseleave', () => {
			// 	img.src = link.srcIcon;
			// });

			this.addListener(
				'mouseenter',
				link.listener.selector.replace('#{id}', `#${link.id}`),
				(event) => {
					const targetElement = event.currentTarget as HTMLElement;
					const img = targetElement.querySelector('img');
					if (img) {
						img.src = link.srcIconHover;
					}
				}
			);

			this.addListener(
				'mouseleave',
				link.listener.selector.replace('#{id}', `#${link.id}`),
				(event) => {
					if ((store.getState("currentPage") as string[]).at(-1) == link.id.split("_")[0])
						return;
					const targetElement = event.currentTarget as HTMLElement;
					const img = targetElement.querySelector('img');
					if (img) {
						img.src = link.srcIcon;
					}
					targetElement.style.color = '#000';

				}
			);


			this.addListener(
				link.listener.eventType,
				link.listener.selector.replace('#{id}', `#${link.id}`),
				(event) => {
					router.navigateTo(link.id.split("_")[0] as AppPage);

					link.listener.callback(event); // Вызываем оригинальный callback если нужно
				}
			);
		});
	}

	public setActiveLink(linkID: string): void {
		this.resetAllLinks();

		const activeLink = LINKS.find(link => link.id.startsWith(linkID + uniqId));
		if (!activeLink) return;

		const element = document.querySelector(`#${activeLink.id}`) as HTMLElement;
		if (!element) return;

		const img = element.querySelector('img');

		element.style.color = '#FE3675';
		if (img) img.src = activeLink.srcIconHover;

		(store.getState("currentPage") as string[]).push(linkID);
	}

	private resetAllLinks(): void {
		LINKS.forEach((otherLink) => {
			const otherElement = document.querySelector(`#${otherLink.id}`) as HTMLElement;
			if (otherElement) {
				otherElement.style.color = '#000';
				const otherImg = otherElement.querySelector('img');
				if (otherImg) otherImg.src = otherLink.srcIcon;
			}
		});
	}
}
