import BaseComponent from '@basecomp';
import templateHBS from './button.hbs';

interface ListenButton {
	eventType: string;
	selector: string;
	callback: () => void;
}

interface ButtonParams {
	idButton: string;
	buttonText: string;
	listenButton: ListenButton;
}

const DEFAULT_PARAMS_BUTTON: ButtonParams = {
	idButton: '',
	buttonText: 'Кнопка',
	listenButton: {
		eventType: '',
		selector: '',
		callback: () => { },
	},
};

export default class Button extends BaseComponent {
	constructor(parentElement: HTMLElement, paramsHBS: Partial<ButtonParams> = {}) {
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
