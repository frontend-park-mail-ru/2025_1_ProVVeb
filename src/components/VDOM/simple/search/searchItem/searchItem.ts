import { VBC } from "@modules/VDOM/VBC";
import templateHBS from './searchItem.hbs';

export class VSearchItem extends VBC {
	constructor(firstImgSrc: string, fullname: string, age: number) {
		super(
			templateHBS,
			{},
			``,
			[],
			{ firstImgSrc, fullname, age },
		);
	}
}
