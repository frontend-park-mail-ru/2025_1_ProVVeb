import { VBC } from '@VDOM/VBC';
import api, { Profile } from '@network';
import Notification from '@notification';
import store from '@store';
import templateHBS from './changeBorders.hbs';

export class VChangeBorders extends VBC {
	constructor(isFirst: boolean, isSecond: boolean, isThird: boolean, isFourth: boolean, isFifth: boolean) {
		super(
			templateHBS,
			{},
			'',
			[
				{
					selector: '.changeBorders__radio',
					eventType: 'change',
					handler: async (event: Event) => {
						const radio = event.target as HTMLInputElement;
						const radioValue = Number(radio.value) - 1;
						if (radio.checked) {
							console.log('Выбран стиль оформления №', radio.value);
							const response = await api.changeBorder(radioValue);
							if (!response.success || !response.data) {
								const notification = new Notification({
									headTitle: 'Ошибка сети',
									title: 'Не удалось изменить стиль оформления',
									isWarning: false,
									isWithButton: true,
								});
								notification.render();
								return;
							}
							store.setState('premiumBorder', radioValue);
						}
					},
				},
			],
			{
				isFirst: isFirst, isSecond: isSecond, isThird: isThird, isFourth: isFourth, isFifth: isFifth
			}
		);
	}
}
