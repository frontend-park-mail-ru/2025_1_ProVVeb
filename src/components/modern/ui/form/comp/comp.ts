import { VBC } from '@VDOM/VBC';
import templateHBS from './comp.hbs';
import api from '@network';

export class VComp extends VBC {
	constructor(
		isResolved: boolean,
		isRejected: boolean,
		from: string,
		to: string,
		title: string,
		date: string,
		complaint_id: number,
	) {
		super(
			templateHBS,
			{ isResolved, isRejected, from, to, title, date },
			'',
			[
				{
					selector: '.buttons__accept',
					eventType: 'click',
					handler: (event) => {
						api.handleComplaint(complaint_id, 3);
						event.target?.closest('.comp-form').classList.add('comp-form--resolved');
					}
				},
				{
					selector: '.buttons__deny',
					eventType: 'click',
					handler: (event) => {
						api.handleComplaint(complaint_id, 0);
						event.target?.closest('.comp-form').classList.add('comp-form--rejected');
					}
				}
			]
		);
	}
}
