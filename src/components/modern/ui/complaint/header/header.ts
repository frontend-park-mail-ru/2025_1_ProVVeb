import { VBC } from '@VDOM/VBC';
import templateHBS from './header.hbs';

export class VComplaintHeader extends VBC {
	constructor(titleText: string = 'Тема:', inputText: string = 'Дизайн сайта') {
		super(
			templateHBS,
			{},
			'',
			[],
			{ titleText, inputText },
		);
	}
}
