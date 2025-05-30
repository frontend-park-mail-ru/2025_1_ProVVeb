import { VBC } from '@VDOM/VBC';
import templateHBS from './searchInput.hbs';

export class VSearchInputComp extends VBC {
	constructor(onClickSearchBtn: () => void, onClickClearBtn: () => void) {
		super(
			templateHBS,
			{},
			'',
			[
				{
					selector: '#filterToggle',
					eventType: 'change',
					handler: (e: Event) => this.handleFilterToggle(e)
				},
				{
					selector: '#searchInput__buttonContainer-C',
					eventType: 'click',
					handler: onClickSearchBtn,
				},
				{
					selector: '#searchInput__clearButton-C',
					eventType: 'click',
					handler: onClickClearBtn,
				},
				{
					selector: '#searchInput__input-C',
					eventType: 'keydown',
					handler: (e: Event) => {
						const event = e as KeyboardEvent;
						if (event.key === 'Enter') {
							onClickSearchBtn();
						}
					}
				}
			],
			{}
		);
	}

	private handleFilterToggle(e: Event) {
		const checkbox = e.target as HTMLInputElement;
		const filter = document.querySelector('.searchInput__filter') as HTMLElement;

		if (checkbox.checked) {
			filter.style.display = 'flex';
			setTimeout(() => {
				filter.style.opacity = '1';
				filter.style.visibility = 'visible';
				filter.style.transform = 'translateY(16px)';
			}, 10);
		} else {
			filter.style.opacity = '0';
			filter.style.visibility = 'hidden';
			filter.style.transform = 'translateY(-10px)';
			setTimeout(() => {
				filter.style.display = 'none';
			}, 200);
		}
	}
}
