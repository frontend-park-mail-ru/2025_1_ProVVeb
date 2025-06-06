import LogoMain from '@simple/logoMain/logoMain';
import Profile from '@simple/profile/profile';
import Header from '@pattern/header/header';
import DotsMenu from '@simple/dotsMenu/dotsMenu';
import router, { AppPage } from '@modules/router';

interface ComponentConfig {
	key: string;
	class: new (parentElement: HTMLElement, options?: any) => any;
	options?: any;
}

export default class HeaderMain extends Header {
	private components: Record<string, any>;

	constructor(parentElement: HTMLElement) {
		const componentConfigs: ComponentConfig[] = [
			{ key: 'logotype', class: LogoMain },
			{ key: 'profile', class: Profile },
		];

		const components: Record<string, any> = {};
		componentConfigs.forEach(({ key, class: ComponentClass, options }) => {
			components[key] = new (ComponentClass as any)(parentElement, options);
		});

		super(parentElement, {
			isGreeting: false,
			logotype: components.logotype.template,
			profile: components.profile.template,
		});

		this.addListener(
			'click',
			'.logotypeBlock',
			() => { router.navigateTo(AppPage.Feed); }
		);

		this.components = components;
	}

	render() {
		super.render();
		Object.values(this.components).forEach((component) => component.attachListeners?.());
	}
}
