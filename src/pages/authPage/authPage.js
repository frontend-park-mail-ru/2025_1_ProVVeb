import BasePage from "../BasePage.js";
import AuthCard from "../../components/compound/authCard/authCard.js";
import HeaderGreeting from "../../components/compound/headerGreeting/headerGreeting.js";

export default class AuthPage extends BasePage {
	constructor(parentElement) {
		super(parentElement);
		this.headerGreeting = new HeaderGreeting(parentElement);
		this.authCard = new AuthCard(parentElement);
	}

	render() {
		this.headerGreeting.render();
		this.authCard.render();
	}
}




























// import BaseComponent from "../../components/BaseComponent.js";
// import router from "../../modules/router.js";
// import AuthCard from "../../components/compound/authCard/authCard.js";
// import HeaderGreeting from "../../components/compound/headerGreeting/headerGreeting.js";

// export default class AuthPage extends BaseComponent {
// 	constructor(parentElement) {
// 		const headerGreeting = new HeaderGreeting(parentElement);
// 		const authCard = new AuthCard(parentElement);
// 		headerGreeting.render();
// 		authCard.render();
// 		console.log(headerGreeting);
// 		console.log(authCard);
// 		// super(headerGreeting.template + authCard.template, parentElement);


// 		// validate = () => {
// 		// 	console.log("Сейчас валидация");
// 		// 	// квериселектр логин контейнера = (1)
// 		// 	// newLogin = new input(state = incorrect , parent = (1))
// 		// 	// newLogin.render()


// 		// 	router.navigateTo('login');
// 		// }
// 	}
// }