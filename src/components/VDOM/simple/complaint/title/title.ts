import { VBC } from "@modules/VDOM/VBC";
import templateHBS from './title.hbs';

export class VComplaintTitle extends VBC {
	constructor(titleText: string = "Тема обращения:", inputText: string = "Напиши тему") {
		super(
			templateHBS,
			{},
			``,
			[],
			{ titleText: titleText, inputText: inputText },
		);
	}
}
