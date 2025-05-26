import HeaderMain from '@compound/headerMain/headerMain';
import NavMenu from '@compound/navMenu/navMenu';
import { VButton } from '@ui/button/button';
import { Compounder } from '@VDOM/Compounder';
import { VBC } from '@VDOM/VBC';
import api from '@network';
import Notification from '@simple/notification/notification';
import store from '@store';
import router, { AppPage } from '@modules/router';

import Confirm from '@simple/confirm/confirm';
import { VChangeBorders } from '@ui/changeBorders/changeBorders';
import BasePage from '../BasePage';

export default class SecurityPage extends BasePage {
	private components: Array<HeaderMain | NavMenu>;

	private contentWrapper: HTMLElement;

	private main: Compounder;

	private premium: Compounder;

	private danger: Compounder;
	// private outButton: VButton;
	// private deleteButton: VButton;

	constructor(parentElement: HTMLElement) {
		super(parentElement);

		this.contentWrapper = document.createElement('div');
		this.contentWrapper.className = 'mainContent';

		this.components = [
			new HeaderMain(parentElement),
			new NavMenu(this.contentWrapper),
		];

		this.main = new Compounder();
		this.premium = new Compounder();
		this.danger = new Compounder();
	}

	async render() {
		this.premium.clear();
		this.danger.clear();
		this.main.clear();

		const userId = store.getState('myID');
		const response = await api.getProfile(userId as number);
		const { data } = response;

		this.main.down('mainContent__central', `
			gap: 35px;
		`);

		this.main.add(this.premium);

		if (data?.Premium.Status) {
			this.premium.down('premiumContainer', '');

			const premiumLabel = new VBC(`
				<p class="premium_title">Настройки подписки</p>
			`, {}, `
				.premium_title {
					width: 100%;
					text-align: center;
					font-weight: 700;
					font-size: 18px;
					color: #4A4A4A;
				}
			`);

			this.premium.add(premiumLabel);

			const premiumBorder = data?.Premium.Border;
			const objBorders = Object.fromEntries(
				Array.from({ length: 5 }, (_, i) => [i, premiumBorder === i])
			);

			const changeBorders = new VChangeBorders(
				objBorders[0],
				objBorders[1],
				objBorders[2],
				objBorders[3],
				objBorders[4]
			);

			this.premium.add(changeBorders);

			this.premium.up();
		}

		this.main.add(this.danger);

		this.danger.down('dangerContainer', `
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 18px;
		`);

		const dangerLabel = new VBC(`
				<p class="danger_title">Опасные настройки</p>
			`, {}, `
				.danger_title {
					width: 100%;
					text-align: center;
					font-weight: 700;
					font-size: 18px;
					color: #4A4A4A;
				}
			`
		);

		this.danger.add(dangerLabel);

		this.danger.down('dangerButtons', `
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			gap: 80px;
		`);

		const outButton = new VButton('Выйти из аккаунта', () => {
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
		});

		outButton.inject(undefined, `
			.btn__title {
				font-weight: 500;
				font-size: 16px;
				text-align: center;
				color: #010710;
			}
		`);

		const deleteButton = new VButton('Удалить аккаунт', async () => {
			const confirmCMP = new Confirm(
				{
					headTitle: 'Уверены?',
					title: 'Вы действительно хотите удалить аккаунт?',
					isWarning: false
				}
			);
			const confirm = await confirmCMP.render();
			if (confirm) {
				api.deleteUser(store.getState('myID') as number).then(() => {
					store.setState('inSession', false);
					router.navigateTo(AppPage.Auth);
				});
			}
		});

		deleteButton.inject(undefined, `
			.btn__title {
				font-weight: 500;
				font-size: 16px;
				text-align: center;
				color: #010710;
			}
			.btn {
				border: 1px solid #FF4D4F;
			}
		`);

		this.danger.add(outButton).add(deleteButton);

		this.contentWrapper.innerHTML = '';
		this.components[0].render();
		this.parentElement.appendChild(this.contentWrapper);
		this.components[1].render();
		console.log('this.main', this.main);

		this.main.addTo(this.contentWrapper);

		store.update('ava');
		store.update('profileName');
		store.update('premiumBorder');
	}

	public getNavMenu(): NavMenu {
		return this.components[1] as NavMenu;
	}
}
