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

const LINKS: LinkConfig[] = [
	{
		title: 'Лента',
		srcIcon: 'media/navMenu/fire.svg',
		srcIconHover: 'media/navMenu/fire_active.svg',
		id: 'feed' + uniqId,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: (event) => {
				// const targetElement = event.currentTarget as HTMLElement;
				// const img = targetElement.querySelector('img');
				
				// if (img) {
				// 	img.src = 'media/navMenu/fire_active.svg'; 
				// 	console.log(img);
				// }

				// targetElement.style.color = '#FE3675';
				// (store.getState("currentPage") as string[]).push("fire");
				console.log('fire');
			},
		},
	},
	{
		title: 'Настройки',
		srcIcon: 'media/navMenu/settings.svg',
		srcIconHover: 'media/navMenu/settings_active.svg',
		id: 'settings' + uniqId,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: (event) => {
				// const targetElement = event.currentTarget as HTMLElement;
				// const img = targetElement.querySelector('img');
				
				// if (img) {
				// 	img.src = 'media/navMenu/settings_active.svg'; 
				// }

				// targetElement.style.color = '#FE3675';
				// (store.getState("currentPage") as string[]).push("settings");
				console.log('settings');
			},
		},
	},
	{
		title: 'Поиск',
		srcIcon: 'media/navMenu/search.svg',
		srcIconHover: 'media/navMenu/search_active.svg',
		id: 'search' + uniqId,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: (event) => {
				// const targetElement = event.currentTarget as HTMLElement;
				// const img = targetElement.querySelector('img');
				
				// if (img) {
				// 	img.src = 'media/navMenu/search_active.svg'; 
				// }

				// targetElement.style.color = '#FE3675';
				// (store.getState("currentPage") as string[]).push("search");
				console.log('search');
			},
		},
	},
	{
		title: 'Мессенджер',
		srcIcon: 'media/navMenu/messenger.svg',
		srcIconHover: 'media/navMenu/messenger_active.svg',
		id: 'messenger' + uniqId,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: (event) => {
				// const targetElement = event.currentTarget as HTMLElement;
				// const img = targetElement.querySelector('img');
				
				// if (img) {
				// 	img.src = 'media/navMenu/messenger_active.svg'; 
				// }

				// targetElement.style.color = '#FE3675';
				// (store.getState("currentPage") as string[]).push("messenger");
				console.log('messenger');
			},
		},
	},
	{
		title: 'Безопасность',
		srcIcon: 'media/navMenu/security.svg',
		srcIconHover: 'media/navMenu/security_active.svg',
		id: 'security' + uniqId,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: (event) => {
				// const targetElement = event.currentTarget as HTMLElement;
				// const img = targetElement.querySelector('img');
				
				// if (img) {
				// 	img.src = 'media/navMenu/security_active.svg'; 
				// }

				// targetElement.style.color = '#FE3675';
				// (store.getState("currentPage") as string[]).push("security");
				console.log('security');
			},
		},
	},
	{
		title: 'Магазин',
		srcIcon: 'media/navMenu/shop.svg',
		srcIconHover: 'media/navMenu/shop_active.svg',
		id: 'shop' + uniqId,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: (event) => {
				// const targetElement = event.currentTarget as HTMLElement;
				// const img = targetElement.querySelector('img');
				
				// if (img) {
				// 	img.src = 'media/navMenu/shop_active.svg'; 
				// }

				// targetElement.style.color = '#FE3675';
				// (store.getState("currentPage") as string[]).push("shop");
				console.log('shop');
			},
		},
	},
	{
		title: 'Список мэтчей',
		srcIcon: 'media/navMenu/feature.svg',
		srcIconHover: 'media/navMenu/feature_active.svg',
		id: 'matches' + uniqId,
		listener: {
			eventType: 'click',
			selector: '#{id}',
			callback: (event) => {
				// const targetElement = event.currentTarget as HTMLElement;
				// const img = targetElement.querySelector('img');
				
				// if (img) {
				// 	img.src = 'media/navMenu/feature_active.svg'; 
				// }

				// targetElement.style.color = '#FE3675';
				// (store.getState("currentPage") as string[]).push("feature");
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
					if((store.getState("currentPage") as string[]).at(-1) == link.id.split("_")[0])
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
					// const targetElement = event.currentTarget as HTMLElement;
					
					// this.resetAllLinks();
			  
					// // Устанавливаем активное состояние текущему пункту
					// targetElement.style.color = '#FE3675';
					// const img = targetElement.querySelector('img');
					// if (img) img.src = link.srcIconHover;
					
					// // Обновляем состояние в store
					// (store.getState("currentPage") as string[]).push(link.id.split("_")[0]);
					router.navigateTo(link.id.split("_")[0] as AppPage);
					
					// Вызываем оригинальный callback если нужно
					link.listener.callback(event);
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
