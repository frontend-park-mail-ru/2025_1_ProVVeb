import templateHBS from './navMenu.hbs';
import BaseComponent from '@basecomp';
import store from '@store';
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
		id: 'fire' + uniqId,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: (event) => {
				const targetElement = event.currentTarget as HTMLElement;
				const img = targetElement.querySelector('img');

				if (img) {
					img.src = 'media/navMenu/active/fire_gradient.svg';
					console.log(img);
				}

				targetElement.style.color = colorOnSelect;
				(store.getState("currentPage") as string[]).push("fire");
				console.log('fire');
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
				const targetElement = event.currentTarget as HTMLElement;
				const img = targetElement.querySelector('img');

				if (img) {
					img.src = 'media/navMenu/active/settings_gradient.svg';
				}

				targetElement.style.color = colorOnSelect;
				(store.getState("currentPage") as string[]).push("settings");
				console.log('settings');
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
				const targetElement = event.currentTarget as HTMLElement;
				const img = targetElement.querySelector('img');

				if (img) {
					img.src = 'media/navMenu/active/search_gradient.svg';
				}

				targetElement.style.color = colorOnSelect;
				(store.getState("currentPage") as string[]).push("search");
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
				const targetElement = event.currentTarget as HTMLElement;
				const img = targetElement.querySelector('img');

				if (img) {
					img.src = 'media/navMenu/active/messenger_gradient.svg';
				}

				targetElement.style.color = colorOnSelect;
				(store.getState("currentPage") as string[]).push("messenger");
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
				const targetElement = event.currentTarget as HTMLElement;
				const img = targetElement.querySelector('img');

				if (img) {
					img.src = 'media/navMenu/active/security_gradient.svg';
				}

				targetElement.style.color = colorOnSelect;
				(store.getState("currentPage") as string[]).push("security");
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
				const targetElement = event.currentTarget as HTMLElement;
				const img = targetElement.querySelector('img');

				if (img) {
					img.src = 'media/navMenu/active/shop_gradient.svg';
				}

				targetElement.style.color = colorOnSelect;
				(store.getState("currentPage") as string[]).push("shop");
				console.log('shop');
			},
		},
	},
	{
		title: 'Список мэтчей',
		srcIcon: 'media/navMenu/feature.svg',
		srcIconHover: 'media/navMenu/active/feature_gradient.svg',
		id: 'feature' + uniqId,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: (event) => {
				const targetElement = event.currentTarget as HTMLElement;
				const img = targetElement.querySelector('img');

				if (img) {
					img.src = 'media/navMenu/active/feature_gradient.svg';
				}

				targetElement.style.color = colorOnSelect;
				(store.getState("currentPage") as string[]).push("feature");
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
					const targetElement = event.currentTarget as HTMLElement;

					// Сбрасываем состояние у всех пунктов
					LINKS.forEach((otherLink) => {
						const otherElement = document.querySelector(`#${otherLink.id}`) as HTMLElement;
						if (otherElement && otherElement !== targetElement) {
							otherElement.style.color = '#000';
							const otherImg = otherElement.querySelector('img');
							if (otherImg) otherImg.src = otherLink.srcIcon;
						}
					});

					// Устанавливаем активное состояние текущему пункту
					targetElement.style.color = colorOnSelect;
					const img = targetElement.querySelector('img');
					if (img) img.src = link.srcIconHover;

					// Обновляем состояние в store
					(store.getState("currentPage") as string[]).push(link.id.split("_")[0]);

					// Вызываем оригинальный callback если нужно
					link.listener.callback(event);
				}
			);
		});
	}
}
