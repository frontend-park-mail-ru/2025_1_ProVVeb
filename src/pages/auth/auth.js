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

	// validate = () => {
	// 	console.log("Сейчас валидация");
	// 	// квериселектр логин контейнера = (1)
	// 	// newLogin = new input(state = incorrect , parent = (1))
	// 	// newLogin.render()


	// 	router.navigateTo('login');
	// }
}
