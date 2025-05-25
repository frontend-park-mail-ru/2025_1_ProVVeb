import LoginCard from '@compound/loginCard/loginCard';
import HeaderGreeting from '@compound/headerGreeting/headerGreeting';
import store from '@store';
import BasePage from '../BasePage';

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
		const user = {
			id: 6,
			login: '',
			password: '',
			email: '',
			phone: '',
			status: 1
		};
		store.setState('myUser', user);
		this.components.forEach((component) => component.render());
	}
}
