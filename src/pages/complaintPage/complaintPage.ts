import BasePage from '../BasePage';
import { Compounder } from '@modules/VDOM/Compounder';
import HeaderMain from '@compound/headerMain/headerMain';
import NavMenu from '@compound/navMenu/navMenu';
import { VComplaintHeader } from '@VDOM/simple/complaint/header/header';
import { VComplaintBody } from '@VDOM/simple/complaint/body/body';
import { VButton } from '@VDOM/simple/button/button';
import Notification from '@simple/notification/notification';

export default class ComplaintPage extends BasePage {
	private components: Array<HeaderMain | NavMenu>;
	private contentWrapper: HTMLElement;
	private compounder: Compounder = new Compounder;

	constructor(parentElement: HTMLElement) {
		super(parentElement);

		this.contentWrapper = document.createElement('div');
		this.contentWrapper.className = 'mainContent';

		this.components = [
			new HeaderMain(parentElement),
			new NavMenu(this.contentWrapper),
		];
	}

	async render(): Promise<void> {
		this.compounder.clear();

		const complaintHeader = new VComplaintHeader();
		const complaintBody = new VComplaintBody();
		const button = new VButton('Отправить', () => {
			const header = complaintHeader.getDOM()?.querySelector('.complaintHeader__input') as HTMLInputElement | null;
			const body = complaintBody.getDOM()?.querySelector('.complaintBody__input') as HTMLTextAreaElement | null;
			const headerValue = header?.value;
			const bodyValue = body?.value;

			if (!headerValue) {
				const notification = new Notification({
					headTitle: "Незаполненное поле",
					title: `Напишите тему обращения перед отправкой`,
					isWarning: false,
					isWithButton: true,
				});
				notification.render();
				return;
			}

			if (!bodyValue) {
				const notification = new Notification({
					headTitle: "Незаполненное поле",
					title: `Напишите текст обращения перед отправкой`,
					isWarning: false,
					isWithButton: true,
				});
				notification.render();
				return;
			}

			// Запрос в бд

		});

		this.compounder.down("complaintContainer", `
			display: flex;
			gap: 30px;
			flex-direction: column;
		`);
		this.compounder.add(complaintHeader);
		this.compounder.add(complaintBody);
		this.compounder.add(button);

		this.contentWrapper.innerHTML = '';
		this.components[0].render();
		this.parentElement.appendChild(this.contentWrapper);
		this.components[1].render();

		this.compounder.addTo(this.contentWrapper);
	}

	public getNavMenu(): NavMenu {
		return this.components[1] as NavMenu;
	}
}
