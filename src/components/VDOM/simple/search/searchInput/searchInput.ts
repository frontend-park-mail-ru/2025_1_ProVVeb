import { VBC } from '@modules/VDOM/VBC';
import store from '@store';
import templateHBS from './searchInput.hbs';

export class VSearchInput extends VBC {
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
                    selector: '#heightMin',
                    eventType: 'input',
                    handler: () => this.handleSliderChange('height')
                },
                {
                    selector: '#heightMax',
                    eventType: 'input',
                    handler: () => this.handleSliderChange('height')
                },
                {
                    selector: '#filterToggle',
                    eventType: 'change',
                    handler: (e: Event) => this.handleFilterToggle(e)
                },
                {
                    selector: '.searchInput__buttonContainer',
                    eventType: 'click',
                    handler: onClickSearchBtn,
                },
                {
                    selector: '.searchInput__clearButton',
                    eventType: 'click',
                    handler: onClickClearBtn,
                },
            ],
            {}
        );
    }

    private handleSliderChange(type: 'age' | 'height') {
        const minSlider = document.getElementById(`${type}Min`) as HTMLInputElement;
        const maxSlider = document.getElementById(`${type}Max`) as HTMLInputElement;
        const minValue = document.getElementById(`${type}MinValue`);
        const maxValue = document.getElementById(`${type}MaxValue`);
        const trackFill = document.querySelector(`.${type}-slider .slider-track-fill`) as HTMLElement;
        this.updateDoubleSlider(minSlider, maxSlider, minValue, maxValue, trackFill);
    }

    private updateDoubleSlider(
        minSlider: HTMLInputElement,
        maxSlider: HTMLInputElement,
        minValue: HTMLElement,
        maxValue: HTMLElement,
        trackFill: HTMLElement
    ) {
        const minVal = parseInt(minSlider.value);
        const maxVal = parseInt(maxSlider.value);
        const min = parseInt(minSlider.min);
        const max = parseInt(minSlider.max);

        if (minVal > maxVal) {
            [minSlider.value, maxSlider.value] = [maxVal, minVal].map(String);
            this.updateDoubleSlider(minSlider, maxSlider, minValue, maxValue, trackFill);
            return;
        }

        minValue.textContent = minSlider.value;
        maxValue.textContent = maxSlider.value;

        const minPosition = (minVal - min) / (max - min);
        const maxPosition = (maxVal - min) / (max - min);

        const thumbWidth = 18;
        const effectiveWidth = minSlider.offsetWidth - thumbWidth;

        const minLeft = minPosition * effectiveWidth;
        const maxLeft = maxPosition * effectiveWidth + thumbWidth;

        trackFill.style.left = `${minLeft}px`;
        trackFill.style.width = `${maxLeft - minLeft}px`;
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
