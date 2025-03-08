import BaseComponent from "../../components/BaseComponent.js";
import router from "../../modules/router.js";
import LoginCard from "../../components/compound/loginCard/loginCard.js";
import HeaderGreeting from "../../components/compound/headerGreeting/headerGreeting.js";

export default class LoginPage extends BaseComponent {
	constructor(parentElement) {
		const headerGreeting = new HeaderGreeting(parentElement).template;
		const loginCard = new LoginCard(parentElement).template;
		super(headerGreeting + loginCard, parentElement);

		// this.addListener(
		// 	'click',
		// 	'#authLink',
		// 	() => { console.log("Отладчик: перешел на авторизацию"); router.navigateTo('auth') }
		// );
	}
}