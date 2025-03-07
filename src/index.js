import router from "./modules/router.js";
import LoginInput from "./components/simple/loginInput/loginInput.js";
import PasswordInput from "./components/simple/passwordInput/passwordInput.js";

// если не авторизован решать куда идти

// router.navigateTo('login');

const root = document.getElementById('root');
const el = new LoginInput(root);
const el1 = new PasswordInput(root);
el.render();
el1.renderBefore();