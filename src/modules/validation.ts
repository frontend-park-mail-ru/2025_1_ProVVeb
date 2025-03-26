import Notification from '../components/simple/notification/notification';

interface ValidatorRule {
	reg: RegExp;
	message: string;
}

interface ValidationResult {
	isOK: boolean;
	message: string | null;
}

interface CheckAuthParams {
	loginValue: string;
	passwordValue: string;
	passwordAgainValue?: string;
}

export const validator = (data: string, rules: ValidatorRule[]): ValidationResult => {
	let error = '';
	for (const rule of rules) {
		if (!rule.reg.test(data)) error = rule.message;
	}

	return error === '' ? { isOK: true, message: null } : { isOK: false, message: error };
};

export const checkLogin = (loginValue: string, passwordValue: string, passwordAgainValue: string): boolean => {
	const loginValidation = validator(loginValue, LOGIN_RULES);
	const passwordValidation = validator(passwordValue, PASSWORD_RULES);

	const loginElement = document.querySelectorAll('.inputContainer')[0] as HTMLElement;
	const passwordElement = document.querySelectorAll('.inputContainer')[1] as HTMLElement;
	const passwordAgainElement = document.querySelectorAll('.inputContainer')[2] as HTMLElement;

	if (passwordValue !== passwordAgainValue) {
		const error = new Notification({ isWarning: true, isWithButton: true, title: 'Пароли не совпадают!' });
		error.render();
		passwordElement.classList.add('incorrect');
		passwordAgainElement.classList.add('incorrect');
		return false;
	}

	passwordElement.classList.remove('incorrect');
	passwordAgainElement.classList.remove('incorrect');

	if (loginValue === undefined) {
		const error = new Notification({ isWarning: true, isWithButton: true, title: 'Логин не может быть пустым!' });
		error.render();
		loginElement.classList.add('incorrect');
		return false;
	}

	if (passwordValue === undefined) {
		const error = new Notification({ isWarning: true, isWithButton: true, title: 'Пароль не может быть пустым!' });
		error.render();
		passwordElement.classList.add('incorrect');
		return false;
	}

	if (!loginValidation.isOK) {
		const error = new Notification({ isWarning: true, isWithButton: true, title: loginValidation.message || 'Что-то пошло не так' });
		error.render();
		loginElement.classList.add('incorrect');
		return false;
	} else if (!passwordValidation.isOK) {
		const error = new Notification({ isWarning: true, isWithButton: true, title: passwordValidation.message || 'Вот бы понять, что не так' });
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

export const checkAuth = (loginValue: string, passwordValue: string): boolean => {
	const loginValidation = validator(loginValue, LOGIN_RULES);
	const passwordValidation = validator(passwordValue, PASSWORD_RULES);

	const loginElement = document.querySelectorAll('.inputContainer')[0] as HTMLElement;
	const passwordElement = document.querySelectorAll('.inputContainer')[1] as HTMLElement;

	if (loginValue === undefined) {
		const error = new Notification({ isWarning: true, isWithButton: true, title: 'Логин не может быть пустым!' });
		error.render();
		loginElement.classList.add('incorrect');
		return false;
	}

	if (passwordValue === undefined) {
		const error = new Notification({ isWarning: true, isWithButton: true, title: 'Пароль не может быть пустым!' });
		error.render();
		passwordElement.classList.add('incorrect');
		return false;
	}

	if (!loginValidation.isOK) {
		const error = new Notification({ isWarning: true, isWithButton: true, title: loginValidation.message || 'Упал. Серьезно?' });
		error.render();
		loginElement.classList.add('incorrect');
		return false;
	} else if (!passwordValidation.isOK) {
		const error = new Notification({ isWarning: true, isWithButton: true, title: passwordValidation.message || 'Ну и падай с ошибкой' });
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

export const LOGIN_RULES: ValidatorRule[] = [
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
		message: 'Логин не может быть меньше 7 символов!',
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

export const LOGIN_BRIEF_RULES: ValidatorRule[] = [
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
		message: 'Первый символ должен быть латинской буквой!',
	}
];

export const PASSWORD_RULES: ValidatorRule[] = [
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

export const PASSWORD_BRIEF_RULES: ValidatorRule[] = [
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
