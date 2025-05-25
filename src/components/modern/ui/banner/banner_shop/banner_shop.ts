import { VBC } from '@VDOM/VBC';
import templateHBS from './banner_shop.hbs';

export class VPlan extends VBC {
	constructor(duration: string, old_sale: number, new_sale: number, discount: number, color: string) {
		super(
			templateHBS,
			{
				duration, oldSale: old_sale, newSale: new_sale, discount
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
