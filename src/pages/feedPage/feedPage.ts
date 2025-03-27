import BasePage from '../BasePage';
import PeopleCards from '@compound/peopleCards/peopleCards';
import HeaderMain from '@compound/headerMain/headerMain';

export default class FeedPage extends BasePage {
	private components: Array<HeaderMain | PeopleCards>;

	constructor(parentElement: HTMLElement) {
		super(parentElement);
		this.components = [
			new HeaderMain(parentElement),
			new PeopleCards(parentElement),
		];
	}

	render(): void {
		this.components.forEach((component) => component.render());
	}
}
