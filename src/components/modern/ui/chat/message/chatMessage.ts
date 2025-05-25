import { VBC } from '@VDOM/VBC';
import templateHBS from './message.hbs';

export class VChatMessage extends VBC {
	constructor(message: string, isMyMessage: boolean) {
		super(
			templateHBS,
			{},
			'',
			[],
			{ message, isMyMessage },
		);
	}
}
