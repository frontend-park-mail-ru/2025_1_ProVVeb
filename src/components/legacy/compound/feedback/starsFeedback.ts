import { VBC } from '@VDOM/VBC';
import templateHBS from './starsFeedback.hbs';

export class VStarsFeedback extends VBC {
	constructor(startText: string) {
		super(
			templateHBS,
			{
				startText: '',
			},
			'',
			[],
			{ startText: startText }
		);
	}
}
