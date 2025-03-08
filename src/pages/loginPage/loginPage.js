import BasePage from "../BasePage.js";
import LoginCard from "../../components/compound/loginCard/loginCard.js";
import HeaderGreeting from "../../components/compound/headerGreeting/headerGreeting.js";

export default class LoginPage extends BasePage {
	constructor(parentElement) {
		super(parentElement);

		this.components = [
			new HeaderGreeting(parentElement),
			new LoginCard(parentElement),
		];
	}

	render() {
		this.components.forEach(component => component.render());
	}
}
