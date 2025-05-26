import { VBC } from '@VDOM/VBC';
import api from '@network';
import templateHBS from './banner_shop.hbs';

export class VPlan extends VBC {
	constructor(
		duration: string,
		old_sale: number,
		new_sale: number,
		discount: number,
		color: string,
		isYoomoney: boolean
	) {
		let id: number = 0;
		switch (duration) {
			case '3 дня': id = 0; break;
			case '1 месяц': id = 1; break;
			case '6 месяцев': id = 2; break;
		}
		super(
			templateHBS,
			{
				duration, oldSale: old_sale, newSale: new_sale, discount, orderId: id, isYoomoney
			}, `
				.banner-shop {
					border: 1px solid ${color};
				}
				.banner-shop__border {
					background: ${color};
				}
				.banner-shop__button {
					background: ${color};
				}
			`,
			[
				{
					eventType: 'click',
					selector: '.banner-shop__button',
					handler: () => {
						if (!isYoomoney)
							api.subscribe();
					}
				}
			]
		);
	}
}
