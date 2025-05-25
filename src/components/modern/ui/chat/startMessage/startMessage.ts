import { VBC } from '@VDOM/VBC';
import templateHBS from './startMessage.hbs';

export class VStartMessage extends VBC {
	constructor() {
		super(
			templateHBS,
			{},
			'',
			[],
			{},
		);
	}
}
