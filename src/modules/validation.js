import router from './router.js';
import Notification from '../components/simple/notification/notification.js';

export const validator = (data, rules) => {
	let error = '';
	for (const rule of rules) if (!rule.reg.test(data)) error = rule.message;

	return error == '' ? { isOK: true, message: null } : { isOK: false, message: error };
};

export const checkLogin = (loginValue, passwordValue, passwordAgainValue) => {
	const loginValidation = validator(loginValue, LOGIN_RULES);
	const passwordValidation = validator(passwordValue, PASSWORD_RULES);

	const loginElement = document.querySelectorAll('.inputContainer')[0];
	const passwordElement = document.querySelectorAll('.inputContainer')[1];
	const passwordAgainElement = document.querySelectorAll('.inputContainer')[2];

	if (passwordValue != passwordAgainValue) {
		const error = new Notification({ isWarning: true, isWithButton: true, title: 'Пароли не совпадают!' });
		error.render();
		passwordElement.classList.add('incorrect');
		passwordAgainElement.classList.add('incorrect');
		return false;
	}
	passwordElement.classList.remove('incorrect');
	passwordAgainElement.classList.remove('incorrect');

	if (loginValue == undefined) {
		const error = new Notification({ isWarning: true, isWithButton: true, title: 'Логин не может быть пустым!' });
		error.render();
		loginElement.classList.add('incorrect');
		return false;
	}
	if (passwordValue == undefined) {
		const error = new Notification({ isWarning: true, isWithButton: true, title: 'Пароль не может быть пустым!' });
		error.render();
		passwordElement.classList.add('incorrect');
		return false;
	}

	if (!loginValidation.isOK) {
		const error = new Notification({ isWarning: true, isWithButton: true, title: loginValidation.message });
		error.render();
		loginElement.classList.add('incorrect');
		return false;
	} else if (!passwordValidation.isOK) {
		const error = new Notification({ isWarning: true, isWithButton: true, title: passwordValidation.message });
		error.render();
		passwordElement.classList.add('incorrect');
		return false;
	} else {
		loginElement.classList.remove('incorrect');
		passwordElement.classList.remove('incorrect');
		passwordAgainElement.classList.remove('incorrect');
		return true;
	}
};

export const checkAuth = (loginValue, passwordValue) => {
	const loginValidation = validator(loginValue, LOGIN_RULES);
	const passwordValidation = validator(passwordValue, PASSWORD_RULES);

	const loginElement = document.querySelectorAll('.inputContainer')[0];
	const passwordElement = document.querySelectorAll('.inputContainer')[1];

	if (loginValue == undefined) {
		const error = new Notification({ isWarning: true, isWithButton: true, title: 'Логин не может быть пустым!' });
		error.render();
		loginElement.classList.add('incorrect');
		return false;
	}
	if (passwordValue == undefined) {
		const error = new Notification({ isWarning: true, isWithButton: true, title: 'Пароль не может быть пустым!' });
		error.render();
		passwordElement.classList.add('incorrect');
		return false;
	}

	if (!loginValidation.isOK) {
		const error = new Notification({ isWarning: true, isWithButton: true, title: loginValidation.message });
		error.render();
		loginElement.classList.add('incorrect');
		return false;
	} else if (!passwordValidation.isOK) {
		const error = new Notification({ isWarning: true, isWithButton: true, title: passwordValidation.message });
		error.render();
		passwordElement.classList.add('incorrect');
		return false;
	} else {
		loginElement.classList.remove('incorrect');
		passwordElement.classList.remove('incorrect');
		return true;
	}
};

const EMOJI = /^[^\p{Extended_Pictographic}]*$/u;

export const LOGIN_RULES = [
	{
		reg: /^[a-zA-Z0-9._]+$/,
		message: 'Логин может содержать только латинские буква, цифры, точку и нижнее подчеркивание!',
	},
	{
		reg: EMOJI,
		message: 'Логин не может содержать эмоджи!',
	},
	{
		reg: /^.{7,}$/,
		message: 'Логин не может быть меньше 10 символов!',
	},
	{
		reg: /^.{1,15}$/,
		message: 'Логин не может быть больше 15 символов!',
	},
	{
		reg: /^[a-zA-Z]/,
		message: 'Перый символ должен быть латинской буквой!',
	}
];

export const LOGIN_BRIEF_RULES = [
	{
		reg: /^[a-zA-Z0-9._]+$/,
		message: 'Логин может содержать только латинские буква, цифры, точку и нижнее подчеркивание!',
	},
	{
		reg: EMOJI,
		message: 'Логин не может содержать эмоджи!',
	},
	{
		reg: /^.{1,15}$/,
		message: 'Логин не может быть больше 15 символов!',
	},
	{
		reg: /^[a-zA-Z]/,
		message: 'Перый символ должен быть латинской буквой!',
	}
];

export const PASSWORD_RULES = [
	{
		message: 'Пароль должен содержать только латинские буквы и цифры',
		reg: /^[a-zA-Z0-9]*$/,
	},
	{
		reg: EMOJI,
		message: 'Пароль не может содержать эмоджи!',
	},
	{
		reg: /^.{8,}$/,
		message: 'Пароль не может быть меньше 8 символов!',
	},
	{
		reg: /^.{1,64}$/,
		message: 'Пароль не может быть больше 64 символов!',
	},
];

export const PASSWORD_BRIEF_RULES = [
	{
		message: 'Пароль должен содержать только латинские буквы и цифры',
		reg: /^[a-zA-Z0-9]*$/,
	},
	{
		reg: EMOJI,
		message: 'Пароль не может содержать эмоджи!',
	},
	{
		reg: /^.{1,64}$/,
		message: 'Пароль не может быть больше 64 символов!',
	},
];
