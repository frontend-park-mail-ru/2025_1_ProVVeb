import { VBC } from '@VDOM/VBC';
import templateHBS from './searchInput.hbs';
import store from '@store';

export class VSearchInputCSAT extends VBC {
	constructor(onClickSearchBtn: () => void, onClickClearBtn: () => void) {
		super(
			templateHBS,
			{},
			'',
			[
				{
					selector: '#ageMin',
					eventType: 'input',
					handler: () => this.handleSliderChange('age')
				},
				{
					selector: '#ageMax',
					eventType: 'input',
					handler: () => this.handleSliderChange('age')
				},
				{
					selector: '#searchInput__buttonContainer-Q',
					eventType: 'click',
					handler: onClickSearchBtn,
				},
				{
					selector: '#searchInput__clearButton-Q',
					eventType: 'click',
					handler: onClickClearBtn,
				},
				{
					selector: '#searchInput__input-Q',
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

	private handleSliderChange(type: 'age') {
		const minSlider = document.getElementById(`${type}Min`) as HTMLInputElement;
		const maxSlider = document.getElementById(`${type}Max`) as HTMLInputElement;
		const minValue = document.getElementById(`${type}MinValue`) as HTMLInputElement;
		const maxValue = document.getElementById(`${type}MaxValue`) as HTMLInputElement;
		const trackFill = document.querySelector(`.${type}-slider .slider-track-fill`) as HTMLElement;

		store.setState('minValueFilter', minValue);
		store.setState('maxValueFilter', maxValue);

		this.updateDoubleSlider(minSlider, maxSlider, minValue, maxValue, trackFill);
	}

	private updateDoubleSlider(
		minSlider: HTMLInputElement,
		maxSlider: HTMLInputElement,
		minValue: HTMLElement,
		maxValue: HTMLElement,
		trackFill: HTMLElement
	) {
		const minVal = parseInt(minSlider.value, 10);
		const maxVal = parseInt(maxSlider.value, 10);
		const min = parseInt(minSlider.min, 10);
		const max = parseInt(minSlider.max, 10);

		if (minVal > maxVal) {
			[minSlider.value, maxSlider.value] = [maxVal, minVal].map(String);
			this.updateDoubleSlider(minSlider, maxSlider, minValue, maxValue, trackFill);
			return;
		}

		minValue.textContent = minSlider.value;
		maxValue.textContent = maxSlider.value;

		const minPosition = (minVal - min) / (max - min);
		const maxPosition = (maxVal - min) / (max - min);

		const thumbWidth = 3;
		const effectiveWidth = minSlider.offsetWidth - thumbWidth;

		const minLeft = minPosition * effectiveWidth;
		const maxLeft = maxPosition * effectiveWidth + thumbWidth;

		trackFill.style.left = `${minLeft}px`;
		trackFill.style.width = `${maxLeft - minLeft}px`;
	}
}
