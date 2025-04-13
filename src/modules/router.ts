import api from '@network';
import store from '@store';
import LoginPage from '@pages/loginPage/loginPage';
import AuthPage from '@pages/authPage/authPage';
import FeedPage from '@pages/feedPage/feedPage';
import ProfilePage from '@pages/profilePage/profilePage';
import MathesPage from '@pages/matchesPage/matchesPage';
import EmptyPage from '@pages/emptyPage/emptyPage';

enum AppPage {
	Auth = 'auth',
	Login = 'login',
	Feed = 'feed',
	Profile = 'profile',
	Matches = 'matches',
	Settings = 'settings',
	Search = 'search',
	Messenger = 'messenger',
	Security = 'security',
	Shop = 'shop',
}

class Router {
	private root: HTMLElement;
	private isChecked: boolean;
	private authPage: AuthPage;
	private loginPage: LoginPage;
	private feedPage: FeedPage;
	private profilePage: ProfilePage;
	private matchesPage: MathesPage;
	private emptyPage: EmptyPage;

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
		this.matchesPage = new MathesPage(this.root);
		this.emptyPage = new EmptyPage(this.root);
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
					this.feedPage.getNavMenu().setActiveLink('feed');
					break;
				// case AppPage.Profile:
				// 	this.root.classList.remove('greeting');
				// 	this.profilePage.rerender();
				// 	break;
				case AppPage.Matches:
					this.root.classList.remove('greeting');
					this.matchesPage.rerender();
					this.matchesPage.getNavMenu().setActiveLink('matches');
					break;
				case AppPage.Settings:
					this.root.classList.remove('greeting');
					this.profilePage.rerender();
					this.profilePage.getNavMenu().setActiveLink('settings');
					break;
				case AppPage.Search:
					this.root.classList.remove('greeting');
					this.emptyPage.rerender();
					this.emptyPage.getNavMenu().setActiveLink('search');
					break;
				case AppPage.Messenger:
					this.root.classList.remove('greeting');
					this.emptyPage.rerender();
					this.emptyPage.getNavMenu().setActiveLink('messenger');
					break;
				case AppPage.Security:
					this.root.classList.remove('greeting');
					this.emptyPage.rerender();
					this.emptyPage.getNavMenu().setActiveLink('security');
					break;
				case AppPage.Shop:
					this.root.classList.remove('greeting');
					this.emptyPage.rerender();
					this.emptyPage.getNavMenu().setActiveLink('shop');
					break;
				default:
					alert('Такой страницы нет. Перенаправляю на логин');
					this.loginPage.rerender();
			}

			store.update('profileName');

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
