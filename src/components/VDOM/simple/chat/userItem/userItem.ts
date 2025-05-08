import { VBC } from '@modules/VDOM/VBC';
import templateHBS from './userItem.hbs';

export class VUserItem extends VBC {
	constructor(
		avatarSrc: string,
		name: string,
		lastMessage: string,
		isSelf: boolean,
		onClick: () => void = () => { },
	) {
		super(
			templateHBS,
			{},
			'',
			[{
				selector: '.userItem',
				eventType: 'click',
				handler: onClick
			}],
			{
				avatarSrc,
				name,
				lastMessage,
				isSelf,
			},
		);
	}
}
