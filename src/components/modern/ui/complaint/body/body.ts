import { VBC } from '@VDOM/VBC';
import templateHBS from './body.hbs';

export class VComplaintBody extends VBC {
	constructor(titleText: string = 'Пожелания:', inputText: string = 'Мне все нравится))') {
		super(
			templateHBS,
			{},
			'',
			[],
			{ titleText, inputText },
		);
	}

	public setValue(text: string) {
		const element = this.getDOM()?.querySelector('textarea') as HTMLTextAreaElement;
		element.value = text;
	}

	public getValue(): string {
		const element = this.getDOM()?.querySelector('textarea') as HTMLTextAreaElement;
		return element.value;
	}
}
