import BaseComponent from '@basecomp';
import templateHBS from './input.hbs';

export interface ListenerParams {
	eventType: string;
	selector: string;
	callback: (event: Event) => void;
}

export interface InputParams {
	typeInput: string;
	idInput: string;
	nameInput: string;
	labelText: string;
	autocompleteInput: string;
	listeners: ListenerParams[];
}

const DEFAULT_PARAMS_INPUT: InputParams = {
	typeInput: 'text',
	idInput: '',
	nameInput: '',
	labelText: 'Поле ввода',
	autocompleteInput: 'off',
	listeners: []
};

export default class Input extends BaseComponent {
	constructor(parentElement: HTMLElement, paramsHBS: Partial<InputParams> = {}) {
		const finalParamsHBS = { ...DEFAULT_PARAMS_INPUT, ...paramsHBS };

		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);
		
		finalParamsHBS.listeners.forEach(listener => {
			this.addListener(
				listener.eventType,
				listener.selector,
				listener.callback
			);
		});
	}
}
