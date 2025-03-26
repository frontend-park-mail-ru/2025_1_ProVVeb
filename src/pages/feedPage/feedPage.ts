import BasePage from '../BasePage';
import PeopleCards from '../../components/compound/peopleCards/peopleCards';
import HeaderMain from '../../components/compound/headerMain/headerMain';
import store from '../../components/Store';

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
		// console.log(store.getState('myID'));
		this.components.forEach((component) => component.render());
	}
}
