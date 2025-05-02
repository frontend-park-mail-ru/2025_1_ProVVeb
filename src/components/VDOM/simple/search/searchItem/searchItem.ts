import { VBC } from "@modules/VDOM/VBC";
import templateHBS from './searchItem.hbs';

export class VSearchItem extends VBC {
	constructor(imgSrc: string, name: string, age: number) {
		super(
			templateHBS,
			{},
			``,
			[],
			{ imgSrc, name, age },
		);
	}
}
