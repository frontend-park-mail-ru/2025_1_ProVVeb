import BaseComponent from '@basecomp';
import router, { AppPage } from '@router';
import store from '@store';
import templateHBS from './navMenu.hbs';

interface NavMenuParams {
	idNavLink: string;
}

const DEFAULT_PARAMS_NAV_MENU: NavMenuParams = {
	idNavLink: '',
};

interface LinkConfig {
	isDev?: boolean;
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

const uniqId = '_navMenu';
const colorOnSelect = '#1a73e8';

const LINKS: LinkConfig[] = [
	{
		title: 'Лента',
		srcIcon: 'media/navMenu/fire.svg',
		srcIconHover: 'media/navMenu/active/fire_gradient.svg',
		id: `feed${uniqId}`,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: () => { },
		},
	},
	{
		title: 'Поиск',
		srcIcon: 'media/navMenu/search.svg',
		srcIconHover: 'media/navMenu/active/search_gradient.svg',
		id: `search${uniqId}`,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: () => { },
		},
	},
	{
		title: 'Мессенджер',
		srcIcon: 'media/navMenu/messenger.svg',
		srcIconHover: 'media/navMenu/active/messenger_gradient.svg',
		id: `messenger${uniqId}`,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: () => { },
		},
	},
	{
		title: 'Список мэтчей',
		srcIcon: 'media/navMenu/feature.svg',
		srcIconHover: 'media/navMenu/active/feature_gradient.svg',
		id: `matches${uniqId}`,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: () => { },
		},
	},
	{
		title: 'Магазин',
		srcIcon: 'media/navMenu/shop.svg',
		srcIconHover: 'media/navMenu/active/shop_gradient.svg',
		id: `shop${uniqId}`,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: () => { },
		},
	},
	{
		title: 'Настройки',
		srcIcon: 'media/navMenu/security.svg',
		srcIconHover: 'media/navMenu/active/security_gradient.svg',
		id: `security${uniqId}`,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: () => { },
		},
	},
	{
		title: 'Мой профиль',
		srcIcon: 'media/navMenu/settings.svg',
		srcIconHover: 'media/navMenu/active/settings_gradient.svg',
		id: `settings${uniqId}`,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: () => { },
		},
	},
	{
		title: 'Админка',
		srcIcon: 'media/navMenu/active/stats_gradient.svg',
		srcIconHover: 'media/navMenu/stats.svg',
		id: `admin${uniqId}`,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: () => { },
		},
	},
	{
		title: 'Обратная связь',
		srcIcon: 'media/navMenu/complaint.svg',
		srcIconHover: 'media/navMenu/active/complaint_gradient.svg',
		id: `complaint${uniqId}`,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: () => { },
		},
	},
];

export default class NavMenu extends BaseComponent {
	constructor(parentElement: HTMLElement, paramsHBS: Partial<NavMenuParams> = {}) {
		const finalParamsHBS = { ...DEFAULT_PARAMS_NAV_MENU, ...paramsHBS };
		const templateHTML = templateHBS({ ...finalParamsHBS, links: LINKS });
		super(templateHTML, parentElement);

		store.subscribe('notif_messanger', (data) => {
			this.setNotification('messenger', data as number);
		});
		store.subscribe('notif_matches', (data) => {
			this.setNotification('matches', data as number);
		});


		LINKS.forEach((link) => {
			if (link.isDev) { return; }

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
					if (window.location.pathname.split('/')[1] === link.id.split('_')[0]) { return; }
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
					router.navigateTo(link.id.split('_')[0] as AppPage);
					link.listener.callback(event);
				}
			);
		});
	}

	public setActiveLink(linkID: string): void {
		this.resetAllLinks();

		const activeLink = LINKS.find((link) => link.id.startsWith(linkID + uniqId) && !link.isDev
		);
		if (!activeLink) { return; }

		const element = document.querySelector(`#${activeLink.id}`) as HTMLElement;
		if (!element) { return; }

		const img = element.querySelector('img');
		element.style.color = '#FE3675';
		if (img) { img.src = activeLink.srcIconHover; }
	}

	private resetAllLinks(): void {
		LINKS.forEach((otherLink) => {
			if (otherLink.isDev) { return; }

			const otherElement = document.querySelector(`#${otherLink.id}`) as HTMLElement;
			if (otherElement) {
				otherElement.style.color = '#000';
				const otherImg = otherElement.querySelector('img');
				if (otherImg) { otherImg.src = otherLink.srcIcon; }
			}
		});
	}

	public setNotification(linkID: string, count: number): void {
		const notifElement = document.getElementById(`notif-${linkID}${uniqId}`);
		if (!notifElement) { return; }

		if (count > 0) {
			notifElement.textContent = String(count);
			notifElement.classList.remove('hidden');
		} else {
			notifElement.classList.add('hidden');
		}
	}

	public clearNotification(linkID: string): void {
		this.setNotification(linkID, 0);
	}

}
