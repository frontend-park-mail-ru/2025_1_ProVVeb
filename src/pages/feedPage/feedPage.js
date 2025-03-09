import BasePage from "../BasePage.js";
import PersonCard from "../../components/compound/personCard/personCard.js";
import HeaderMain from "../../components/compound/headerMain/headerMain.js";

export default class FeedPage extends BasePage {
	constructor(parentElement) {
		super(parentElement);

		this.components = [
			new HeaderMain(parentElement),
			new PersonCard(parentElement),
		];
	}

	render() {
		this.components.forEach(component => component.render());
	}
}