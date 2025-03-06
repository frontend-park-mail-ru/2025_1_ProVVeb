'use strict';

import BaseComponent from '../../BaseComponent.js';
import Store from '../../Store.js';
import router from '../../../modules/router.js';

export class LoginInput extends BaseComponent {
	constructor(parentElement) { //, [{.., .., ..}] // id передавать чтобы понять 
		const template = Handlebars.templates['loginInput.hbs'];
		console.log(template);
		const renderTemplate = template();
		super(renderTemplate, parentElement);
		// addListener({ 'click', document.toReg, () => { router.nagitaTo('login') } })
		// Store.subscribe('loginInputValue', (value) => {
		// 	this.parentElement.querySelector('.login').textContent = value;
		// });
	}
}