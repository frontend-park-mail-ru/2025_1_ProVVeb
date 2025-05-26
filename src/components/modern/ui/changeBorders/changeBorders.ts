import { VBC } from '@VDOM/VBC';
import templateHBS from './changeBorders.hbs';
import api, { Profile } from '@network';

export class VChangeBorders extends VBC {
	constructor(isFirst: boolean, isSecond: boolean, isThird: boolean, isFourth: boolean, isFifth: boolean) {
		super(
			templateHBS,
			{},
			'',
			[
				{
					selector: '.changeBorders__radio',
					eventType: 'change',
					handler: (event: Event) => {
						const radio = event.target as HTMLInputElement;
						if (radio.checked) {
							console.log('Выбран стиль оформления №', radio.value);
						}
					},
				},
			],
			{ isFirst: isFirst, isSecond: isSecond, isThird: isThird, isFourth: isFourth, isFifth: isFifth }
		);
	}
}
