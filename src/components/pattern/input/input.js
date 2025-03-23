import BaseComponent from '../../BaseComponent.js';
import templateHBS from './input.hbs';

const DEFAULT_PARAMS_INPUT = {
	typeInput: 'text',
	idInput: '',
	nameInput: '',
	labelText: 'Поле ввода',
	autocompleteInput: 'off',
};

DEFAULT_PARAMS_INPUT.listenInput = {
	eventType: '',
	selector: '',
	callback: () => { },
};

DEFAULT_PARAMS_INPUT.listenFocus = {
	eventType: '',
	selector: '',
	callback: () => { },
};

export default class Input extends BaseComponent {
	constructor(parentElement, paramsHBS = {}) {
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
