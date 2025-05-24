import { VBC } from '@modules/VDOM/VBC';
import templateHBS from './backButton.hbs';

export class VBackButton extends VBC {
	constructor(callback: () => void) {
		super(
			templateHBS,
			{ callback: () => { } },
			'',
			[{
				selector: '.backButton',
				eventType: 'click',
				handler: callback
			}],
		);
	}
}
