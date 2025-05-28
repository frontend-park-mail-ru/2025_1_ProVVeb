import { VBC } from '@VDOM/VBC';
import templateHBS from './statCard.hbs';
import { VStars } from '../../ui/stars/stars';
import api from '@network';

export class VStatCard extends VBC {
	constructor(
		login: string,
		point: number,
		date: string,
		review: string,
		userId: number,
		query_name: string,
	) {
		const starEl = new VStars(point);

		super(
			templateHBS,
			{},
			'',
			[
				// {
				// 	selector: '.buttons__accept',
				// 	eventType: 'click',
				// 	handler: () => { }
				// },
				{
					selector: '.buttons__deny',
					eventType: 'click',
					handler: (event) => {
						api.deleteQuery(query_name, userId);
						event.target?.closest('.statCard').remove();
					}
				}
			],
			{ login, stars: starEl.compileTemplate(), date, review }
		);
	}
}
