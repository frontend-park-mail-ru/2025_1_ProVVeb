import BasePage from '../BasePage.js';
import AuthCard from '../../components/compound/authCard/authCard.js';
import HeaderGreeting from '../../components/compound/headerGreeting/headerGreeting.js';

export default class AuthPage extends BasePage {
	constructor(parentElement) {
		super(parentElement);
		this.components = [
			new HeaderGreeting(parentElement),
			new AuthCard(parentElement),
		];
	}

	render() {
		this.components.forEach((component) => component.render());
	}
}
