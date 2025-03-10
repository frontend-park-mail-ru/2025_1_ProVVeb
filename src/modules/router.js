import LoginPage from '../pages/loginPage/loginPage.js';
import AuthPage from '../pages/authPage/authPage.js';
import FeedPage from '../pages/feedPage/feedPage.js';
import api from './network.js';

class Router {
	constructor() {
		this.root = document.getElementById('root');
		this.authPage = new AuthPage(this.root);
		this.loginPage = new LoginPage(this.root);
		this.feedPage = new FeedPage(this.root);
	}

	async navigateTo(page) {
		// const sessionResult = await api.checkSession();
		// console.log(sessionResult);

		// if (sessionResult.success) {
		// 	this.root.classList.remove('greeting');
		// 	this.feedPage.rerender();
		// 	return;
		// }

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
	}
}

const router = new Router();
export default router;
