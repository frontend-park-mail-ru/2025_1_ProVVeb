import BaseComponent from '../../BaseComponent';
import templateHBS from './input.hbs';

interface ListenerParams {
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
	listenInput: ListenerParams;
	listenFocus: ListenerParams;
}

const DEFAULT_PARAMS_INPUT: InputParams = {
	typeInput: 'text',
	idInput: '',
	nameInput: '',
	labelText: 'Поле ввода',
	autocompleteInput: 'off',
	listenInput: {
		eventType: '',
		selector: '',
		callback: () => { },
	},
	listenFocus: {
		eventType: '',
		selector: '',
		callback: () => { },
	},
};

export default class Input extends BaseComponent {
	constructor(parentElement: HTMLElement, paramsHBS: Partial<InputParams> = {}) {
		const finalParamsHBS = { ...DEFAULT_PARAMS_INPUT, ...paramsHBS };

		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);

		this.addListener(
			finalParamsHBS.listenInput.eventType,
			finalParamsHBS.listenInput.selector,
			finalParamsHBS.listenInput.callback
		);

		this.addListener(
			finalParamsHBS.listenFocus.eventType,
			finalParamsHBS.listenFocus.selector,
			finalParamsHBS.listenFocus.callback
		);
	}
}
