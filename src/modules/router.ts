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

interface PathStructure {
	path: string;
	callback: (state: any) => void;
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

	private PATHS: PathStructure[];

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

		this.PATHS = [];

		window.addEventListener('popstate', (event) => {
			const path = window.location.pathname.split('/')[1];
			this.navigateTo(path as AppPage, event.state, true);
		});

		this.register("feed", this.handlerFeed.bind(this));
		this.register("auth", this.handlerAuth.bind(this));
		this.register("login", this.handlerLogin.bind(this));
		this.register("matches", this.handlerMatches.bind(this));
		this.register("settings", this.handlerSettings.bind(this));
		this.register("search", this.handlerSearch.bind(this));
		this.register("messenger", this.handlerMessenger.bind(this));
		this.register("security", this.handlerSecurity.bind(this));
		this.register("shop", this.handlerShop.bind(this));
	}

	async checkSession(): Promise<boolean> {
		try {
			if (!this.isChecked) {
				this.isChecked = true;

				const sessionResult = await api.checkSession();
				console.log('sessionResult', sessionResult);
				console.log('4', 4);
				console.log('sessionResult.success', sessionResult.success)
				console.log('sessionResult.data.inSession', sessionResult.data.inSession)
				if (sessionResult.success && sessionResult.data.inSession) {
					console.log('5', 5);
					console.log('sessionResult.success', sessionResult.success)
					store.setState('myID', sessionResult.data.id);
					store.setState('isSession', true);
					// this.root.classList.remove('greeting');
					// this.feedPage.rerender();
					console.log('6', 6);
					return true;
				}
			}
		} catch (error) {
			console.error('Ошибка при проверке сессии:', error);
			alert('Ошибка сети. Перенаправляю на логин');
			this.loginPage.rerender();
		}

		return false;
	}

	public register(path: string, callback: (state: any) => void): void {
		this.PATHS.push({ path, callback });
	}

	public async renderPage(path: string, state = {}) {
		if (await this.checkSession()) {
			this.PATHS.forEach(data => {
				if (data.path == AppPage.Feed) data.callback(state);
			})
		} else {
			this.PATHS.forEach(data => {
				if (data.path == path) data.callback(state);
			})
		}
	}

	public async navigateTo(page: AppPage, state: any = {}, isReplace = false): Promise<void> {
		if (isReplace)
			window.history.replaceState(state, '', page);
		else
			window.history.pushState(state, '', page);

		await this.renderPage(page, state);

		store.update('profileName');
		store.update('ava');
	}

	private handlerAuth(state: any): void {
		this.root.classList.add('greeting');
		this.authPage.rerender();
	}

	private handlerLogin(state: any): void {
		this.root.classList.add('greeting');
		this.loginPage.rerender();
	}

	private handlerFeed(state: any): void {
		this.root.classList.remove('greeting');
		this.feedPage.rerender();
		this.feedPage.getNavMenu().setActiveLink('feed');
	}

	private handlerMatches(state: any): void {
		this.root.classList.remove('greeting');
		this.matchesPage.rerender();
		this.matchesPage.getNavMenu().setActiveLink('matches');
	}

	private handlerSettings(state: any): void {
		this.root.classList.remove('greeting');
		this.profilePage.rerender();
		this.profilePage.getNavMenu().setActiveLink('settings');
	}

	private handlerSearch(state: any): void {
		this.root.classList.remove('greeting');
		this.emptyPage.rerender();
		this.emptyPage.getNavMenu().setActiveLink('search');
	}

	private handlerMessenger(state: any): void {
		this.root.classList.remove('greeting');
		this.emptyPage.rerender();
		this.emptyPage.getNavMenu().setActiveLink('messenger');
	}

	private handlerSecurity(state: any): void {
		this.root.classList.remove('greeting');
		this.emptyPage.rerender();
		this.emptyPage.getNavMenu().setActiveLink('security');
	}

	private handlerShop(state: any): void {
		this.root.classList.remove('greeting');
		this.emptyPage.rerender();
		this.emptyPage.getNavMenu().setActiveLink('shop');
	}
}

const router = new Router();
export default router;
export { AppPage };
