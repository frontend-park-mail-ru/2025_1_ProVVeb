import router from './modules/router.js';
import LoginInput from './components/simple/loginInput/loginInput.js';
import PasswordInput from './components/simple/passwordInput/passwordInput.js';
import HeaderGreeting from './components/compound/headerGreeting/headerGreeting.js';
import HeaderMain from './components/compound/headerMain/headerMain.js';
import PersonCard from './components/compound/personCard/personCard.js';
import store from './components/Store.js';

// если не авторизован решать куда идти

router.navigateTo('auth');
// router.navigateTo('auth');

// const root = document.getElementById('root');
// const el = new PersonCard(root, {
// 	personName: 'Екатерина',
// });

// console.log(el);

// el.render();
