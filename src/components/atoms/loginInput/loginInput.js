'use strict';

import BaseComponent from '../../BaseComponent.js';
import Store from '../../Store.js';
// import Handlebars from 'handlebars';
// import { Handlebars } from "../../../precompiled.js";


export class LoginInput extends BaseComponent {
	constructor(parentElement) {
		const template = Handlebars.templates['loginInput.hbs'];
		console.log(template);
		super(template, parentElement);

		Store.subscribe('loginInputValue', (value) => {
			this.parentElement.querySelector('.login').textContent = value;
		});
	}
}