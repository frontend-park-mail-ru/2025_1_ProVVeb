import router from "./modules/router.js";
import LoginCard from "./components/compound/loginCard/loginCard.js";
import AuthCard from "./components/compound/authCard/authCard.js";
// если не авторизован решать куда идти

// router.navigateTo('login');

const root = document.getElementById('root');
const el = new LoginCard(root);
const el1 = new AuthCard(root);
el.render();
el1.renderBefore();