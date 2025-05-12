import { VBC } from '@VDOM/VBC';
import templateHBS from './addButton.hbs';

export class VAddButton extends VBC {
	constructor(callback: () => void) {
		super(
			templateHBS,
			{ callback: () => { } },
			'',
			[{
				selector: '.addButton',
				eventType: 'click',
				handler: callback
			}],
		);
	}
}
