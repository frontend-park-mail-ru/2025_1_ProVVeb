import router from './modules/router.js';

// если не авторизован решать куда идти

router.navigateTo('auth');

// const root = document.getElementById('root');
// const el0 = new HeaderGreeting(root);
// const error = new Notification(root, {isWarning: false, isWithButton: true, title: "Такой логин и пароль не зарегистрированы",})
// const el = new LoginInput(root);
// const el1 = new PasswordInput(root);

// error.render();
// el0.render();
// el.render();
// el1.render();
