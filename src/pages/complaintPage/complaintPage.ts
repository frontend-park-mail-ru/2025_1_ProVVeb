import { Compounder } from '@VDOM/Compounder';
import HeaderMain from '@compound/headerMain/headerMain';
import NavMenu from '@compound/navMenu/navMenu';
import { VComplaintHeader } from '@ui/complaint/header/header';
import { VComplaintBody } from '@ui/complaint/body/body';
import { VButton } from '@ui/button/button';
import Notification from '@notification';
import api from '@network';
import BasePage from '../BasePage';

export default class ComplaintPage extends BasePage {
	private components: Array<HeaderMain | NavMenu>;

	private contentWrapper: HTMLElement;

	private compounder: Compounder = new Compounder();

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
		const button = new VButton('Отправить', async () => {
			const header = complaintHeader.getDOM()?.querySelector('.complaintHeader__input') as HTMLInputElement | null;
			const body = complaintBody.getDOM()?.querySelector('.complaintBody__input') as HTMLTextAreaElement | null;
			const headerValue = header?.value.trim();
			const bodyValue = body?.value.trim();

			if (!headerValue) {
				const notification = new Notification({
					headTitle: 'Незаполненное поле',
					title: 'Напишите тему обращения перед отправкой',
					isWarning: false,
					isWithButton: true,
				});
				notification.render();
				return;
			}

			if (!bodyValue) {
				const notification = new Notification({
					headTitle: 'Незаполненное поле',
					title: 'Напишите текст обращения перед отправкой',
					isWarning: false,
					isWithButton: true,
				});
				notification.render();
				return;
			}

			const response = await api.sendComplaint(
				headerValue,
				bodyValue
			);

			if (response.success && response.data) {
				const notification = new Notification({
					headTitle: 'Успешно',
					title: 'Ваше обращение отправлено',
					isWarning: false,
					isWithButton: true,
				});
				notification.render();

				if (header) { header.value = ''; }
				if (body) { body.value = ''; }
			} else {
				const notification = new Notification({
					headTitle: 'Ошибка отправки',
					title: 'Не удалось отправить обращение. Попробуйте позже',
					isWarning: false,
					isWithButton: true,
				});
				notification.render();
			}
		});

		this.compounder.down('complaintContainer', `
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
