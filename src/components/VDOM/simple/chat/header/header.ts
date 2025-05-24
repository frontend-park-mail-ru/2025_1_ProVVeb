import { VBC } from '@modules/VDOM/VBC';
import templateHBS from './header.hbs';

export class VChatHeader extends VBC {
	constructor(avatarSrc: string, name: string, additionally: string) {
		super(
			templateHBS,
			{},
			'',
			[],
			{ avatarSrc, name, additionally },
		);
	}
}
