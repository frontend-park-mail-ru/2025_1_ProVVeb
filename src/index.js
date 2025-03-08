import router from "./modules/router.js";
import LoginInput from "./components/simple/loginInput/loginInput.js";
import PasswordInput from "./components/simple/passwordInput/passwordInput.js";
import Logo from "./components/pattern/logo/logo.js";
import LogoMain from "./components/simple/logoMain/logoMain.js";

// если не авторизован решать куда идти

// router.navigateTo('login');

const root = document.getElementById('root');
const logo = new Logo(root);
const el = new LoginInput(root);
const el1 = new PasswordInput(root);
logo.renderInit();
el.render();
el1.render();