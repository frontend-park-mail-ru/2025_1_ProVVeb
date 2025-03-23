import BaseComponent from '../../BaseComponent.js';
import templateHBS from './button.hbs';

const DEFAULT_PARAMS_BUTTON = {
	idButton: '',
	buttonText: 'Кнопка',
};

DEFAULT_PARAMS_BUTTON.listenButton = {
	eventType: '',
	selector: '',
	callback: () => { },
};

export default class Button extends BaseComponent {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = { ...DEFAULT_PARAMS_BUTTON, ...paramsHBS };

		if (finalParamsHBS.idButton) {
			finalParamsHBS.listenButton.selector = `#${finalParamsHBS.idButton}`;
		}

		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);

		this.addListener(
			finalParamsHBS.listenButton.eventType,
			finalParamsHBS.listenButton.selector,
			finalParamsHBS.listenButton.callback
		);
	}
}
