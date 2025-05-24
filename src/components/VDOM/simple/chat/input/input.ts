import { VBC } from '@modules/VDOM/VBC';
import templateHBS from './input.hbs';

export class VChatInput extends VBC {
	constructor(
		profileId: number,
		onClick: () => void = () => { },
	) {
		super(
			templateHBS,
			{},
			'',
			[
				{
					selector: '.chatInput__send',
					eventType: 'click',
					handler: onClick
				},
				{
					selector: '.chatInput__input',
					eventType: 'keydown',
					handler: (e: KeyboardEvent) => {
						if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault();
							onClick();
						}
					}
				}
			],
			{ profileId },
		);
	}
}
