import { VBC } from '@VDOM/VBC';
import templateHBS from './comp.hbs';

export class VComp extends VBC {
	constructor(
		from: string,
		to: string,
		title: string,
		date: string
	) {
		super(
			templateHBS,
			{ from, to, title, date }, '', [
			{
				selector: '.buttons__accept',
				eventType: 'click',
				handler: () => { }
			},
			{
				selector: '.buttons__deny',
				eventType: 'click',
				handler: () => { }
			}
		]
		);
	}
}
