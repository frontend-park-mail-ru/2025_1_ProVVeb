import { VBC } from "@modules/VDOM/VBC";
import templateHBS from './header.hbs';

export class VComplaintHeader extends VBC {
	constructor(titleText: string = "Тема обращения:", inputText: string = "Напиши тему") {
		super(
			templateHBS,
			{},
			``,
			[],
			{ titleText, inputText },
		);
	}
}
