import LoginPage from "../pages/loginPage/loginPage.js";
import AuthPage from "../pages/authPage/authPage.js";

class Router {
	constructor() {
		const root = document.getElementById('root');
		this.authPage = new AuthPage(root);
		this.loginPage = new LoginPage(root);
	}

	navigateTo(page) {
		switch (page) {
			case 'auth':
				this.authPage.render();
				break;
			case 'login':
				this.loginPage.render();
				break;
			default:
				alert("Такой страницы нет. Перенаправляю на логин");
				this.loginPage.render();
		}
	}
}

const router = new Router();
export default router;
