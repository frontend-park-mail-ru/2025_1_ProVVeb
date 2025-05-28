import { VBC } from '@VDOM/VBC';
import templateHBS from './option.hbs';

const DEFAULT_OPTION_PARAMS = {
	title: 'ОПЦИЯ',
};

export class VOption extends VBC {
	public isChecked: boolean;

	constructor(title: string, isFirst: boolean = false) {
		super(
			templateHBS,
			DEFAULT_OPTION_PARAMS,
			'',
			[],
			{ title: title, isFirst: isFirst }
		);
		this.isChecked = false;
		this.inject(undefined, '', [{
			selector: '.option',
			eventType: 'click',
			handler: (event) => {
				let target = event.target as HTMLElement;
				if (target.className === 'option__text') { target = target.parentElement as HTMLElement; }
				if (!this.isChecked) {
					target.classList.add('option-checked');
					this.isChecked = true;
				} else {
					target.classList.remove('option-checked');
					this.isChecked = false;
				}
			}
		}]);
	}

	public setChecked(): void {
		this.getDOM()?.click();
	}
}
