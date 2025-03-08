import router from "./modules/router.js";
import LoginInput from "./components/simple/loginInput/loginInput.js";
import PasswordInput from "./components/simple/passwordInput/passwordInput.js";
import HeaderGreeting from "./components/compound/headerGreeting/headerGreeting.js";
import HeaderMain from "./components/compound/headerMain/headerMain.js";

// если не авторизован решать куда идти

router.navigateTo('auth');

// const root = document.getElementById('root');
// const el0 = new HeaderGreeting(root);
// const el = new LoginInput(root);
// const el1 = new PasswordInput(root);

// el0.render();
// el.render();
// el1.render();
