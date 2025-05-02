import { VBC } from '@modules/VDOM/VBC';
import templateHBS from './button.hbs';

export class VButton extends VBC {
	constructor(lable: string = "SHAH", onClick: () => void = () => { }) {
		super(
			templateHBS,
			{}, '',
			[
				{
					selector: '.btn',
					eventType: 'click',
					handler: onClick
				}
			],
			{ lable: lable }
		);
	}
}
