import { LoginInput } from './components/atoms/loginInput/loginInput.js'
import router from './modules/router.js';

// если не авторизован решать куда идти

// 
// const loginInput = new LoginInput(root);
// loginInput.render();

router.navigateTo('login')

/*
в рут пихаем авторизацию
в авторизации я могу перейти на регистрацию
авторизация - это организм который состоит их меньших
и как раза авторизация включает в себя атом ссылку на регистрацию
а ссылка будет содержать обработчик который в конструкторе определяет обработчик
очистка родителя = это просто освобождение обработчика


проверки в 
*/