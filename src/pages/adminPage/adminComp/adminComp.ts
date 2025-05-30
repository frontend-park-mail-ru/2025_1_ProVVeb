import { VComps } from "@features/compForm/compForm";
import { VSearchInputComp } from "@ui/search/searchInput/searchInputComp/searchInput";
import { Compounder } from "@VDOM/Compounder";
import { VBC } from "@VDOM/VBC";
import api from "@network";
import Notification from '@notification';
import store from "@store";

export class VAdminComp extends VBC {
	constructor(complaints: []) {
		const main = new Compounder();

		main.down('admin', `
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 10px;
		`);

		const input = new VSearchInputComp(async () => {
			const input = document.querySelector('.searchInput__input') as HTMLInputElement;
			const selectedStatus = document.querySelector('input[name="gender"]:checked') as HTMLInputElement;

			const complaintsData = await api.findComplaints(
				undefined,
				input.value.trim(),
				undefined,
				input.value.trim(),
				undefined,
				Number(selectedStatus.value)
			);

			if (!complaintsData.success) {
				new Notification({
					headTitle: 'Ошибка сети',
					title: 'Не удалось получить данные. Попробуйте позже',
					isWarning: false,
					isWithButton: true,
				}).render();
				return;
			}

			if (complaintsData.data.complaints === null) {
				new Notification({
					headTitle: 'Жалобы не найдены',
					title: 'С текущими параметрами не найдено жалоб',
					isWarning: false,
					isWithButton: true,
				}).render();
				return;
			}

			store.setState('newDataForAdminComp', complaintsData.data.complaints);
		}, () => {
			const input = document.querySelector('.searchInput__input') as HTMLInputElement;
			input.value = '';
			const selectedStatus = document.querySelector('input[name="gender"]:checked') as HTMLInputElement;
			selectedStatus.checked = false;
			const selectedDefault = document.querySelector('input[name="gender"][value="1"]') as HTMLInputElement;
			selectedDefault.checked = true;
		});

		const comps = new VComps(complaints);
		comps.insertData();

		main.add(input);
		main.add(comps);

		super(main.getTemplate());

		this.vdom = main.getVDOM();
		this.setID();
	}
}
