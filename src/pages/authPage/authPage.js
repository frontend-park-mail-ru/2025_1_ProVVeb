import BaseComponent from "../../components/BaseComponent.js";
import router from "../../modules/router.js";
import AuthCard from "../../components/compound/authCard/authCard.js";

export default class AuthPage extends BaseComponent {
	constructor(parentElement) {
		// const header = new Header(parentElement);
		const authCard = new AuthCard(parentElement).template;
		super(authCard, parentElement);


		// validate = () => {
		// 	console.log("Сейчас валидация");
		// 	// квериселектр логин контейнера = (1)
		// 	// newLogin = new input(state = incorrect , parent = (1))
		// 	// newLogin.render()


		// 	router.navigateTo('login');
		// }
	}
}