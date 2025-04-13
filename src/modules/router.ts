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

interface PathStructure{
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

	async checkSession(): Promise<void>{
		try {
			if (!this.isChecked) {
				const sessionResult = await api.checkSession();

				if (sessionResult.success && sessionResult.data.InSession) {
					store.setState('myID', sessionResult.data.id);
					this.root.classList.remove('greeting');
					this.feedPage.rerender();
					return;
				}

				this.isChecked = true;
			}
		} catch (error) {
			console.error('Ошибка при проверке сессии:', error);
			alert('Ошибка сети. Перенаправляю на логин');
			this.loginPage.rerender();
		}
	}

	public register(path: string, callback: (state: any)=>void): void{
		this.PATHS.push({ path, callback });
	}

	public async renderPage(path: string, state={}){
		await this.checkSession();

		this.PATHS.forEach(data => {
			if(data.path == path) data.callback(state);
		})
	}

	public async navigateTo(page: AppPage, state: any = {}, isReplace = false): Promise<void>{
		if(isReplace)
			window.history.replaceState(state, '', page);
		else
			window.history.pushState(state, '', page);

		await this.renderPage(page, state);

		store.update('profileName');
		store.update('ava');
	}

	private handlerAuth(state: any): void{
		this.root.classList.add('greeting');
		this.authPage.rerender();
	}

	private handlerLogin(state: any): void{
		this.root.classList.add('greeting');
		this.loginPage.rerender();
	}

	private handlerFeed(state: any): void{
		this.root.classList.remove('greeting');
		this.feedPage.rerender();
		this.feedPage.getNavMenu().setActiveLink('feed');
	}
	
	private handlerMatches(state: any): void{
		this.root.classList.remove('greeting');
		this.matchesPage.rerender();
		this.matchesPage.getNavMenu().setActiveLink('matches');
	}

	private handlerSettings(state: any): void{
		this.root.classList.remove('greeting');
		this.profilePage.rerender();
		this.profilePage.getNavMenu().setActiveLink('settings');
	}

	private handlerSearch(state: any): void{
		this.root.classList.remove('greeting');
		this.emptyPage.rerender();
		this.emptyPage.getNavMenu().setActiveLink('search');
	}

	private handlerMessenger(state: any): void{
		this.root.classList.remove('greeting');
		this.emptyPage.rerender();
		this.emptyPage.getNavMenu().setActiveLink('messenger');
	}

	private handlerSecurity(state: any): void{
		this.root.classList.remove('greeting');
		this.emptyPage.rerender();
		this.emptyPage.getNavMenu().setActiveLink('security');
	}

	private handlerShop(state: any): void{
		this.root.classList.remove('greeting');
		this.emptyPage.rerender();
		this.emptyPage.getNavMenu().setActiveLink('shop');
	}

	// async navigateTo(page: AppPage): Promise<void> {
	// 	try {
	// 		if (!this.isChecked) {
	// 			const sessionResult = await api.checkSession();

	// 			if (sessionResult.success && sessionResult.data.InSession) {
	// 				store.setState('myID', sessionResult.data.id);
	// 				this.root.classList.remove('greeting');
	// 				this.feedPage.rerender();
	// 				return;
	// 			}

	// 			this.isChecked = true;
	// 		}


	// 		switch (page) {
	// 			case AppPage.Auth:
	// 				this.root.classList.add('greeting');
	// 				this.authPage.rerender();
	// 				break;
	// 			case AppPage.Login:
	// 				this.root.classList.add('greeting');
	// 				this.loginPage.rerender();
	// 				break;
	// 			case AppPage.Feed:
	// 				this.root.classList.remove('greeting');
	// 				this.feedPage.rerender();
	// 				this.feedPage.getNavMenu().setActiveLink('feed');
	// 				break;
	// 			// case AppPage.Profile:
	// 			// 	this.root.classList.remove('greeting');
	// 			// 	this.profilePage.rerender();
	// 			// 	break;
	// 			case AppPage.Matches:
	// 				this.root.classList.remove('greeting');
	// 				this.matchesPage.rerender();
	// 				this.matchesPage.getNavMenu().setActiveLink('matches');
	// 				break;
	// 			case AppPage.Settings:
	// 				this.root.classList.remove('greeting');
	// 				this.profilePage.rerender();
	// 				this.profilePage.getNavMenu().setActiveLink('settings');
	// 				break;
	// 			case AppPage.Search:
	// 				this.root.classList.remove('greeting');
	// 				this.emptyPage.rerender();
	// 				this.emptyPage.getNavMenu().setActiveLink('search');
	// 				break;
	// 			case AppPage.Messenger:
	// 				this.root.classList.remove('greeting');
	// 				this.emptyPage.rerender();
	// 				this.emptyPage.getNavMenu().setActiveLink('messenger');
	// 				break;
	// 			case AppPage.Security:
	// 				this.root.classList.remove('greeting');
	// 				this.emptyPage.rerender();
	// 				this.emptyPage.getNavMenu().setActiveLink('security');
	// 				break;
	// 			case AppPage.Shop:
	// 				this.root.classList.remove('greeting');
	// 				this.emptyPage.rerender();
	// 				this.emptyPage.getNavMenu().setActiveLink('shop');
	// 				break;
	// 			default:
	// 				alert('Такой страницы нет. Перенаправляю на логин');
	// 				this.loginPage.rerender();
	// 		}

	// 		store.update('profileName');
	// 		store.update('ava');

	// 	} catch (error) {
	// 		console.error('Ошибка при проверке сессии:', error);
	// 		alert('Ошибка сети. Перенаправляю на логин');
	// 		this.loginPage.rerender();
	// 	}
	// }
}

const router = new Router();
export default router;
export { AppPage };
