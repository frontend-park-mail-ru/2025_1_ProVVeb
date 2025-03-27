import FormCard from '@pattern/formCard/formCard';
import ProgressBar from '@simple/progressBar/progressBar';
import LoginInput from '@simple/loginInput/loginInput';
import PasswordInput from '@simple/passwordInput/passwordInput';
import LinkToLogin from '@simple/linkToLogin/linkToLogin';
import AuthButton from '@simple/authButton/authButton';

interface ComponentConfig {
	key: string;
	class: new (parentElement: HTMLElement, options?: any) => any; // Динамическое создание классов
	options?: any;
}

export default class AuthCard extends FormCard {
	private components: Record<string, any>;

	constructor(parentElement: HTMLElement) {
		const componentConfigs: ComponentConfig[] = [
			{ key: 'progressBar', class: ProgressBar, options: { progressPercent: 100 } },
			{ key: 'linkToPage', class: LinkToLogin },
			{ key: 'loginInput', class: LoginInput },
			{ key: 'passwordInput', class: PasswordInput },
			{ key: 'authButton', class: AuthButton },
		];

		const components: Record<string, any> = {};
		componentConfigs.forEach(({ key, class: ComponentClass, options }) => {
			components[key] = new (ComponentClass as any)(parentElement, options);
		});

		super(parentElement, {
			progressBar: components.progressBar.template,
			cardTitle: 'Здесь начнется поиск ❤️',
			linkToPage: components.linkToPage.template,
			fields: [
				components.loginInput.template,
				components.passwordInput.template,
			],
			button: components.authButton.template,
		});

		this.components = components;
	}

	render() {
		super.render();
		Object.values(this.components).forEach((component) => component.attachListeners());
	}
}
