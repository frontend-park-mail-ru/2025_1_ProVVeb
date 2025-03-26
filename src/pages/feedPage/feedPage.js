import BasePage from '../BasePage.js';
import PeopleCards from '../../components/compound/peopleCards/peopleCards.js';
import HeaderMain from '../../components/compound/headerMain/headerMain.js';
import store from '../../components/Store.js';

export default class FeedPage extends BasePage {
	constructor(parentElement) {
		super(parentElement);
		this.components = [
			new HeaderMain(parentElement),
			new PeopleCards(parentElement),
		];
	}

	render() {
		// console.log(store.getState('myID'));
		this.components.forEach((component) => component.render());
	}
}
