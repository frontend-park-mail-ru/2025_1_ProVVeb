import api from '@network';
import store from '@store';
import LoginPage from '@pages/loginPage/loginPage';
import AuthPage from '@pages/authPage/authPage';
import FeedPage from '@pages/feedPage/feedPage';
import ProfilePage from '@pages/profilePage/profilePage';

enum AppPage {
	Auth = 'auth',
	Login = 'login',
	Feed = 'feed',
	Profile = 'profile',
}

class Router {
	private root: HTMLElement;
	private isChecked: boolean;
	private authPage: AuthPage;
	private loginPage: LoginPage;
	private feedPage: FeedPage;
	private profilePage: ProfilePage;

	constructor() {
		const rootElement = document.getElementById('root');
		if (!rootElement) {
			throw new Error("Root element with id 'root' not found");
		}

		this.root = rootElement;
		this.isChecked = false;
		this.authPage = new AuthPage(this.root);
		this.loginPage = new LoginPage(this.root);
		this.feedPage = new FeedPage(this.root);
		this.profilePage = new ProfilePage(this.root);
	}

	async navigateTo(page: AppPage): Promise<void> {
		try {
			if (this.isChecked) {
				const sessionResult = await api.checkSession();

				if (sessionResult.success && sessionResult.data.InSession) {
					store.setState('myID', sessionResult.data.id);
					this.root.classList.remove('greeting');
					this.feedPage.rerender();
					return;
				}

				this.isChecked = true;
			}

			switch (page) {
				case AppPage.Auth:
					this.root.classList.add('greeting');
					this.authPage.rerender();
					break;
				case AppPage.Login:
					this.root.classList.add('greeting');
					this.loginPage.rerender();
					break;
				case AppPage.Feed:
					this.root.classList.remove('greeting');
					this.feedPage.rerender();
					break;
				case AppPage.Profile:
					this.root.classList.remove('greeting');
					this.profilePage.rerender();
					break;
				default:
					alert('Такой страницы нет. Перенаправляю на логин');
					this.loginPage.rerender();
			}
		} catch (error) {
			console.error('Ошибка при проверке сессии:', error);
			alert('Ошибка сети. Перенаправляю на логин');
			this.loginPage.rerender();
		}
	}
}

const router = new Router();
export default router;
export { AppPage };
