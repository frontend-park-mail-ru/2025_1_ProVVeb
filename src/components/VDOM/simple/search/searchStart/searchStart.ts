import { VBC } from "@modules/VDOM/VBC";
import templateHBS from './searchStart.hbs';

export class VSearchStart extends VBC {
	constructor(
		text: string = 'Начни свой поиск!',
		hint: string = 'Введи параметры в фильтры выше',
	) {
		super(
			templateHBS,
			{},
			``,
			[],
			{ text, hint },
		);
	}
}
