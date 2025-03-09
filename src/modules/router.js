import LoginPage from '../pages/loginPage/loginPage.js';
import AuthPage from '../pages/authPage/authPage.js';
import FeedPage from '../pages/feedPage/feedPage.js';

class Router {
    constructor() {
        const root = document.getElementById('root');
        this.authPage = new AuthPage(root);
        this.loginPage = new LoginPage(root);
        this.feedPage = new FeedPage(root);
    }

    navigateTo(page) {
        switch (page) {
        case 'auth':
            this.authPage.rerender();
            break;
        case 'login':
            this.loginPage.rerender();
            break;
        case 'feed':
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
