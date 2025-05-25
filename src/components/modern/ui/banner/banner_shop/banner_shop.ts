import { VBC } from '@VDOM/VBC';
import templateHBS from './banner_shop.hbs';

export class VPlan extends VBC {
	constructor(duration: string, old_sale: number, new_sale: number, discount: number, color: string) {
		let id: number = 0;
		switch (duration) {
			case '1 месяц': id = 0; break;
			case '6 месяцев': id = 1; break;
			case '1 год': id = 2; break;
		}
		super(
			templateHBS,
			{
				duration, oldSale: old_sale, newSale: new_sale, discount, orderId: id
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
					handler: () => { console.log("Subscribe button pressed"); }
				}
			]
		);
	}
}
