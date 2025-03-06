import BaseComponent from "../../components/BaseComponent.js";
import router from "../../modules/router.js";

export default class LoginPage extends BaseComponent {
	constructor(parentElement) {
		const templateHBS = Handlebars.templates['login.hbs'];
		const templateHTML = templateHBS();
		super(templateHTML, parentElement);

		this.addListener(
			'click', 
			'#authLink',
			() => { console.log("Отладчик: перешел на авторизацию"); router.navigateTo('auth') } 
		);
	}
}