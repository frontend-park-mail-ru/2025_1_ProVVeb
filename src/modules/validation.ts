import Notification from '@simple/notification/notification';

interface ValidatorRule {
	reg: RegExp;
	message: string;
}

interface ValidationResult {
	isOK: boolean;
	message: string | null;
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
		const error = new Notification({ isWarning: true, isWithButton: true, title: 'Пароли должны совпадать' });
		error.render();
		passwordElement.classList.add('incorrect');
		passwordAgainElement.classList.add('incorrect');
		return false;
	}

	passwordElement.classList.remove('incorrect');
	passwordAgainElement.classList.remove('incorrect');

	if (loginValue === undefined) {
		const error = new Notification({ isWarning: true, isWithButton: true, title: 'Введите логин' });
		error.render();
		loginElement.classList.add('incorrect');
		return false;
	}

	if (passwordValue === undefined) {
		const error = new Notification({ isWarning: true, isWithButton: true, title: 'Введите пароль' });
		error.render();
		passwordElement.classList.add('incorrect');
		return false;
	}

	if (!loginValidation.isOK) {
		const error = new Notification({ isWarning: true, isWithButton: true, title: loginValidation.message || 'Технические неполадки. Попробуйте позже' });
		error.render();
		loginElement.classList.add('incorrect');
		return false;
	} else if (!passwordValidation.isOK) {
		const error = new Notification({ isWarning: true, isWithButton: true, title: passwordValidation.message || 'Технические неполадки. Попробуйте позже' });
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
		const error = new Notification({ isWarning: true, isWithButton: true, title: 'Введите логин' });
		error.render();
		loginElement.classList.add('incorrect');
		return false;
	}

	if (passwordValue === undefined) {
		const error = new Notification({ isWarning: true, isWithButton: true, title: 'Введите пароль' });
		error.render();
		passwordElement.classList.add('incorrect');
		return false;
	}

	if (!loginValidation.isOK) {
		const error = new Notification({ isWarning: true, isWithButton: true, title: loginValidation.message || 'Технические неполадки. Попробуйте позже' });
		error.render();
		loginElement.classList.add('incorrect');
		return false;
	} else if (!passwordValidation.isOK) {
		const error = new Notification({ isWarning: true, isWithButton: true, title: passwordValidation.message || 'Технические неполадки. Попробуйте позже' });
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
		message: 'Логин должен содержать латинские буквы, цифры, точку и нижнее подчеркивание',
	},
	{
		reg: EMOJI,
		message: 'Эмодзи в логине не разрешены',
	},
	{
		reg: /^.{7,}$/,
		message: 'Логин должен быть больше 7 символов',
	},
	{
		reg: /^.{1,15}$/,
		message: 'Логин должен быть меньше 15 символов',
	},
	{
		reg: /^[a-zA-Z]/,
		message: 'Логин должен начинаться с латинской буквы',
	}
];

export const LOGIN_BRIEF_RULES: ValidatorRule[] = [
	{
		reg: /^[a-zA-Z0-9._]+$/,
		message: 'Логин должен содержать латинские буквы, цифры, точку и нижнее подчеркивание',
	},
	{
		reg: EMOJI,
		message: 'Эмодзи в логине не разрешены',
	},
	{
		reg: /^.{1,15}$/,
		message: 'Логин должен быть меньше 15 символов',
	},
	{
		reg: /^[a-zA-Z]/,
		message: 'Логин должен начинаться с латинской буквы',
	}
];

export const PASSWORD_RULES: ValidatorRule[] = [
	{
		reg: EMOJI,
		message: 'Эмодзи в пароле не разрешены',
	},
	{
		reg: /^.{8,}$/,
		message: 'Пароль должен быть больше 8 символов',
	},
	{
		reg: /^.{1,64}$/,
		message: 'Пароль должен быть меньше 64 символов',
	},
];

export const PASSWORD_BRIEF_RULES: ValidatorRule[] = [
	{
		reg: EMOJI,
		message: 'Эмодзи в пароле не разрешены',
	},
	{
		reg: /^.{1,64}$/,
		message: 'Пароль должен быть меньше 64 символов',
	},
];
