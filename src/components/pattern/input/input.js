import BaseComponent from "../../BaseComponent.js";
import store from '../../Store.js';

const DEFAULT_PARAMS_INPUT = {
	typeInput: 'text',
	idInput: '',
	nameInput: '',
	labelText: 'Поле ввода',
	autocompleteInput: 'off',
}

export default class Input extends BaseComponent {
	//, [{.., .., ..}] - обработчики // id передавать чтобы понять 
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = Object.assign({}, DEFAULT_PARAMS_INPUT, paramsHBS);
		const templateHBS = Handlebars.templates['input.hbs'];
		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);
	}

	// this.addListener('click', '#submitButton', this.handleSubmit.bind(this));

	// store.subscribe('inputValue', (value) => {
	// 	this.parentElement.querySelector('#displayText').textContent = value;
	// });

	// Store.subscribe('loginInputValue', (value) => {
	// 	this.parentElement.querySelector('.login').textContent = value;
	// });

	// handleSubmit() {
	// 	const inputValue = this.parentElement.querySelector('#inputField').value;
	// 	store.setState('inputValue', inputValue); // Обновляем состояние
	// }
}