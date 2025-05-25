import { VBC } from '@VDOM/VBC';
import templateHBS from './groundFeedback.hbs';

export class VGroundFeedback extends VBC {
	constructor(groundText: string) {
		super(
			templateHBS,
			{
				groundText: '',
			},
			'',
			[],
			{ groundText: groundText }
		);
	}
}
