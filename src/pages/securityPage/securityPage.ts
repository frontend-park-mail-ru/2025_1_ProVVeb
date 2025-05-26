import HeaderMain from '@compound/headerMain/headerMain';
import NavMenu from '@compound/navMenu/navMenu';
import BasePage from '../BasePage';
import { VButton } from '@ui/button/button';
import { Compounder } from '@VDOM/Compounder';
import { VBC } from '@VDOM/VBC';
import api from '@network';
import Notification from '@simple/notification/notification';
import store from '@store';
import { AppPage } from '@modules/router';
import router from '@modules/router';
import Confirm from '@simple/confirm/confirm';
import { VChangeBorders } from '@ui/changeBorders/changeBorders';

export default class SecurityPage extends BasePage {
	private components: Array<HeaderMain | NavMenu>;

	private contentWrapper: HTMLElement;

	private main: Compounder;
	private premium: Compounder;
	private danger: Compounder;
	private outButton: VButton;
	private deleteButton: VButton;

	constructor(parentElement: HTMLElement) {
		super(parentElement);

		this.contentWrapper = document.createElement('div');
		this.contentWrapper.className = 'mainContent';

		this.components = [
			new HeaderMain(parentElement),
			new NavMenu(this.contentWrapper),
		];

		this.main = new Compounder();
		this.main.down('mainContent__central', `
			gap: 35px;
		`);

		this.premium = new Compounder();
		this.main.add(this.premium);
		console.log(store.getState('isPremium') as boolean);
		// if (store.getState('isPremium') as boolean) {
		this.premium.down('premiumContainer', `
			
		`);

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
			`
		);

		this.premium.add(premiumLabel);

		console.log(store.getState('premiumBorder') as number)
		const premiumBorder = 2; // store.getState('premiumBorder') as number;
		console.log(premiumBorder);
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
		// }


		this.danger = new Compounder();
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

		this.outButton = new VButton("Выйти из аккаунта", () => {
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

		this.outButton.inject(undefined, `
			.btn__title {
				font-weight: 500;
				font-size: 16px;
				text-align: center;
				color: #010710;
			}
		`)

		this.deleteButton = new VButton("Удалить аккаунт", async () => {
			const confirmCMP = new Confirm(
				{
					headTitle: "Уверены?",
					title: "Вы действительно хотите удалить аккаунт?",
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

		this.deleteButton.inject(undefined, `
			.btn__title {
				font-weight: 500;
				font-size: 16px;
				text-align: center;
				color: #010710;
			}
			.btn {
				border: 1px solid #FF4D4F;
			}
		`)

		this.danger.add(this.outButton).add(this.deleteButton);
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
