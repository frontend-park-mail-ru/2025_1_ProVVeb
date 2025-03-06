import BaseComponent from "../../components/BaseComponent.js";
import router from "../../modules/router.js";

export default class AuthPage extends BaseComponent {
	constructor(parentElement) {
		const templateHBS = Handlebars.templates['auth.hbs'];
		const templateHTML = templateHBS();
		super(templateHTML, parentElement);

		this.addListener(
			'click', 
			'#loginLink',
			() => { console.log("Отладчик: перешел на регистрацию"); router.navigateTo('login') } 
		);
	}
}