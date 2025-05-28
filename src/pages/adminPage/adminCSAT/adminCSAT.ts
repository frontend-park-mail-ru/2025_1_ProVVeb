import { VComps } from "@features/compForm/compForm";
import { VCSAT } from "@features/CSATForm/CSATForm";
import { VSearchInputComp } from "@ui/search/searchInput/searchInputComp/searchInput";
import { VSearchInputCSAT } from "@ui/search/searchInput/searchInputCSAT/searchInput";
import { Compounder } from "@VDOM/Compounder";
import { VBC } from "@VDOM/VBC";
import api from "@network";
import Notification from '@simple/notification/notification';
import store from "@store";

export class VAdminCSAT extends VBC {
	constructor(feedbacks: []) {
		const main = new Compounder();
		const input = new VSearchInputCSAT(async () => {
			const input = document.querySelector('.searchInput__input') as HTMLInputElement;

			const feedbacksData = await api.findQueries(
				input.value.trim()
			);

			if (!feedbacksData.success) {
				new Notification({
					headTitle: 'Ошибка сети',
					title: 'Не удалось получить данные. Попробуйте позже',
					isWarning: false,
					isWithButton: true,
				}).render();
				return;
			}

			if (feedbacksData.data.answers === null) {
				new Notification({
					headTitle: 'Отзывы не найдены',
					title: 'С текущими параметрами не найдено отзывов',
					isWarning: false,
					isWithButton: true,
				}).render();
				return;
			}

			store.setState('newDataForAdminCSAT', feedbacksData.data.answers);
		}, () => {
			const input = document.querySelector('.searchInput__input') as HTMLInputElement;
			input.value = '';
		});

		const comps = new VCSAT(feedbacks);
		comps.insertData();

		main.down('admin', `
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 10px;
		`);
		main.add(input);
		main.add(comps);

		super(main.getTemplate());
		this.vdom = main.getVDOM();
		this.setID();
	}
}
