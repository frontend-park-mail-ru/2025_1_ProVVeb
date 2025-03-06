import LoginPage from "../pages/login/login.js";
import AuthPage from "../pages/auth/auth.js";

class Router {
	constructor() {
		const root = document.getElementById('root');
		this.loginPage = new LoginPage(root);
		this.authPage = new AuthPage(root);
	}

	navigateTo(page) {
		switch (page) {
			case 'login':
				this.loginPage.render();
				break;
			case 'auth':
				this.authPage.render();
				break;
			default:
				alert("Такой страницы нет. Перенаправляю на логин");
				this.loginPage.render();
		}
	}
}

const router = new Router();
export default router;
