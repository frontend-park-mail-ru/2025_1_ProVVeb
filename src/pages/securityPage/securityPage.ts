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

export default class SecurityPage extends BasePage {
	private components: Array<HeaderMain | NavMenu>;

	private contentWrapper: HTMLElement;

	private main: Compounder;
	private button1: VButton;
	private button2: VButton;

	constructor(parentElement: HTMLElement) {
		super(parentElement);

		this.contentWrapper = document.createElement('div');
		this.contentWrapper.className = 'mainContent';

		this.components = [
			new HeaderMain(parentElement),
			new NavMenu(this.contentWrapper),
		];


		this.main = new Compounder();
		this.main.down('mainContent__central');
		const lable = new VBC(`
				<p class="danger_text">Опасные настройки</p>
			`, {}, `
				.danger_text {
					width: 100%;
					text-align: center;
					font-weight: 700;
					font-size: 15px;
					color: #4A4A4A;
				}
			`
		);
		this.main.add(lable).down('buttons', `
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
			`);
		this.button1 = new VButton("ВЫЙТИ ИЗ АККАУНТА", () => {
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
		this.button1.inject(undefined, `
				.btn__title {
					font-weight: 500;
					font-size: 14px;
					text-align: center;
					color: #010710;
				}
			`)
		this.button2 = new VButton("УДАЛИТЬ АККАУНТ", async () => {
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
		this.button2.inject(undefined, `
				.btn__title {
					font-weight: 500;
					font-size: 14px;
					text-align: center;
					color: #010710;
				}
				.btn {
					border: 1px solid #FF4D4F;
				}
			`)
		this.main.add(this.button1).add(this.button2);
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
