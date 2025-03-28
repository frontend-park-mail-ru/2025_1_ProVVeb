import LoginPage from '@pages/loginPage/loginPage';
import AuthPage from '@pages/authPage/authPage';
import FeedPage from '@pages/feedPage/feedPage';
import api from '@network';
import store from '@store';

class Router {
	private root: HTMLElement;
	private authPage: AuthPage;
	private loginPage: LoginPage;
	private feedPage: FeedPage;
	private isChecked: boolean;

	constructor() {
		const rootElement = document.getElementById('root');
		if (!rootElement) {
			throw new Error("Root element with id 'root' not found");
		}

		this.root = rootElement;

		this.authPage = new AuthPage(this.root);
		this.loginPage = new LoginPage(this.root);
		this.feedPage = new FeedPage(this.root);
		this.isChecked = false;
	}

	async navigateTo(page: 'auth' | 'login' | 'feed'): Promise<void> {
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
				case 'auth':
					this.root.classList.add('greeting');
					this.authPage.rerender();
					break;
				case 'login':
					this.root.classList.add('greeting');
					this.loginPage.rerender();
					break;
				case 'feed':
					this.root.classList.remove('greeting');
					this.feedPage.rerender();
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
