import BasePage from '../BasePage';
import LoginCard from '../../components/compound/loginCard/loginCard';
import HeaderGreeting from '../../components/compound/headerGreeting/headerGreeting';

export default class LoginPage extends BasePage {
	private components: Array<HeaderGreeting | LoginCard>;

	constructor(parentElement: HTMLElement) {
		super(parentElement);

		this.components = [
			new HeaderGreeting(parentElement),
			new LoginCard(parentElement),
		];
	}

	render(): void {
		this.components.forEach((component) => component.render());
	}
}
