import LogoMain from '../../simple/logoMain/logoMain.js';
import Profile from '../../simple/profile/profile.js';
import Header from '../../pattern/header/header.js';
import LogoutButton from '../../simple/logoutButton/logoutButton.js';

export default class HeaderMain extends Header {
	constructor(parentElement) {
		const componentConfigs = [
			{ key: 'logotype', class: LogoMain },
			{ key: 'logoutSessionBtn', class: LogoutButton },
			{ key: 'profile', class: Profile }
		];

		const components = {};
		for (const { key, class: ComponentClass, options } of componentConfigs) {
			components[key] = new ComponentClass(parentElement, options);
		}

		super(parentElement, {
			logotype: components.logotype.template,
			logoutSessionBtn: components.logoutSessionBtn.template,
			profile: components.profile.template,
			isGreeting: false
		});

		this.components = components;
	}

	render() {
		super.render();
		Object.values(this.components).forEach((component) => component.attachListeners?.());
	}
}
