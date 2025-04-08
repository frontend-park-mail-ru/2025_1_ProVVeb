import BasePage from '../BasePage';
import HeaderMain from '@compound/headerMain/headerMain';
// import ProfileInfo from '@compound/profileInfo/profileInfo';

export default class ProfilePage extends BasePage {
	private components: Array<HeaderMain>;

	constructor(parentElement: HTMLElement) {
		super(parentElement);
		this.components = [
			new HeaderMain(parentElement),
		];
	}

	render(): void {
		this.components.forEach((component) => component.render());
	}
}
