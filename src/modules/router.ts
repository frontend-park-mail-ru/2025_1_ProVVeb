import api from '@network';
import store from '@store';
import Notification from '@notification';
import LoginPage from '@pages/loginPage/loginPage';
import AuthPage from '@pages/authPage/authPage';
import FeedPage from '@pages/feedPage/feedPage';
import ProfilePage from '@pages/profilePage/profilePage';
import MathesPage from '@pages/matchesPage/matchesPage';
import EmptyPage from '@pages/emptyPage/emptyPage';
import StatPage from '@pages/statPage/statPage';
import ComplaintPage from '@pages/complaintPage/complaintPage';
import MessagePage from '@pages/messagePage/messagePage';
import StepPage from '@pages/stepLoginPage/stepLoginPage';
import SearchPage from '@pages/searchPage/searchPage';

enum AppPage {
	Auth = 'auth',
	Login = 'login',
	Feed = 'feed',
	Profile = 'profile',
	Matches = 'matches',
	Settings = 'settings',
	Security = 'security',
	Shop = 'shop',
	StatPage = 'stats',
	ComplaintPage = 'complaint',
	Messenger = 'messenger',
	StepPage = 'step',
	Search = 'search',
}

interface PathStructure {
	path: string;
	callback: (state: any) => void;
}

class Router {
	private root: HTMLElement;

	private authPage: AuthPage;

	private loginPage: LoginPage;

	private feedPage: FeedPage;

	private profilePage: ProfilePage;

	private matchesPage: MathesPage;

	private emptyPage: EmptyPage;

	private statPage: StatPage;

	private complaintPage: ComplaintPage;

	private messagePage: MessagePage;

	private stepPage: StepPage;

	private searchPage: SearchPage;

	private PATHS: PathStructure[];

	constructor() {
		const rootElement = document.getElementById('root');
		if (!rootElement) {
			throw new Error('Root element with id \'root\' not found');
		}

		this.root = rootElement;
		this.authPage = new AuthPage(this.root);
		this.loginPage = new LoginPage(this.root);
		this.feedPage = new FeedPage(this.root);
		this.profilePage = new ProfilePage(this.root);
		this.matchesPage = new MathesPage(this.root);
		this.emptyPage = new EmptyPage(this.root);
		this.statPage = new StatPage(this.root);
		this.complaintPage = new ComplaintPage(this.root);
		this.messagePage = new MessagePage(this.root);
		this.stepPage = new StepPage(this.root);
		this.searchPage = new SearchPage(this.root);

		this.PATHS = [];

		window.addEventListener('popstate', (event) => {
			const path = window.location.pathname.split('/')[1];
			this.navigateTo(path as AppPage, event.state, true);
		});

		this.register('feed', this.handlerFeed.bind(this));
		this.register('auth', this.handlerAuth.bind(this));
		this.register('login', this.handlerLogin.bind(this));
		this.register('matches', this.handlerMatches.bind(this));
		this.register('settings', this.handlerSettings.bind(this));
		this.register('security', this.handlerSecurity.bind(this));
		this.register('shop', this.handlerShop.bind(this));
		this.register('stats', this.handlerStats.bind(this));
		this.register('complaint', this.handlerComplaint.bind(this));
		this.register('messenger', this.handlerMessenger.bind(this));
		this.register('step', this.handlerStep.bind(this));
		this.register('search', this.handlerSearch.bind(this));
	}

	private async checkSession(): Promise<boolean> {
		try {
			const sessionResult = await api.checkSession();

			if (sessionResult.success && sessionResult.data.inSession) {
				store.setState('myID', sessionResult.data.id);
				store.setState('inSession', true);

				return true;
			}
		} catch (error) {
			const notification = new Notification({
				title: 'Ошибка сети. Перенаправление на логин',
				isWarning: true,
				isWithButton: true,
			});
			notification.render();
		}

		store.setState('inSession', false);
		return false;
	}

	public register(path: string, callback: (state: any) => void): void {
		this.PATHS.push({ path, callback });
	}

	public renderPage(path: string, state = {}) {
		this.PATHS.forEach((data) => {
			if (data.path === path) { data.callback(state); }
		});
	}

	public async navigateTo(page: AppPage, state: any = {}, isReplace = false): Promise<void> {
		const cookie = this.checkCookie(page) as AppPage;
		if (cookie !== page) {
			isReplace = true;
			page = cookie;
		}

		if (isReplace) {
			window.history.replaceState(state, '', page);
		} else {
			window.history.pushState(state, '', page);

		}

		await this.renderPage(page, state);

		store.update('profileName');
		store.update('ava');
	}

	public async start() {
		const currentPath = window.location.pathname.split('/')[1] as AppPage || AppPage.Feed;

		if (!(await this.checkSession())) {
			if (currentPath !== AppPage.Auth && currentPath !== AppPage.Login) {
				this.navigateTo(AppPage.Auth, {}, true);
			} else {
				this.navigateTo(currentPath, {}, true);
			}

			return;
		}

		await this.navigateTo(currentPath);

		const ID = store.getState('myID') as number;
		const data = await api.getProfile(ID);
		const ava = api.BASE_URL_PHOTO + (data?.data?.photos[0] ?? '');
		const name = `${data?.data?.firstName} ${data?.data?.lastName}`;

		if (ava) { store.setState('ava', ava); }
		if (name) { store.setState('profileName', name); }
		if (data?.data?.isMale) { store.setState('isMale', data?.data?.isMale); }
	}

	private checkCookie(page: AppPage): AppPage {
		const inSession = store.getState('inSession');
		if (!inSession && page !== AppPage.Auth && page !== AppPage.Login && page !== AppPage.StepPage) {
			return AppPage.Auth;
		}
		if (inSession && (page === AppPage.Auth || page === AppPage.Login || page === AppPage.StepPage)) {
			return AppPage.Settings;
		}
		return page;
	}

	private handlerAuth(state: any): void {
		this.root.classList.add('greeting');
		this.authPage.rerender();
	}

	private handlerLogin(state: any): void {
		this.root.classList.add('greeting');
		this.loginPage.rerender();
	}

	private handlerStep(state: any): void {
		this.root.classList.add('greeting');
		this.stepPage.rerender();
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

	private handlerStats(state: any): void {
		this.root.classList.remove('greeting');
		this.statPage.rerender();
		this.statPage.getNavMenu().setActiveLink('stats');
	}

	private handlerComplaint(state: any): void {
		this.root.classList.remove('greeting');
		this.complaintPage.rerender();
		this.complaintPage.getNavMenu().setActiveLink('complaint');
	}

	private handlerMessenger(state: any): void {
		this.root.classList.remove('greeting');
		this.messagePage.rerender();
		this.messagePage.getNavMenu().setActiveLink('messenger');
	}

	private handlerSearch(state: any): void {
		this.root.classList.remove('greeting');
		this.searchPage.rerender();
		this.searchPage.getNavMenu().setActiveLink('search');
	}
}

const router = new Router();
export default router;
export { AppPage };
