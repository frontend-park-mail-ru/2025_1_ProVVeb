import BaseComponent from "../../BaseComponent.js";
import store from '../../Store.js';

const DEFAULT_PARAMS_INPUT = {
	typeInput: 'text',
	idInput: '',
	nameInput: '',
	labelText: 'Поле ввода',
}

export default class Input extends BaseComponent {
	//, [{.., .., ..}] - обработчики // id передавать чтобы понять 
	constructor(parentElement, paramsHBS = DEFAULT_PARAMS_INPUT) {
		const templateHBS = Handlebars.templates['input.hbs'];
		const templateHTML = templateHBS(paramsHBS);
		super(templateHTML, parentElement);
	}

	// Store.subscribe('loginInputValue', (value) => {
	// 	this.parentElement.querySelector('.login').textContent = value;
	// });
}