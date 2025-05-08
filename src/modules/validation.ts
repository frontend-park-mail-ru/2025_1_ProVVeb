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
        if (!rule.reg.test(data)) { error = rule.message; }
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
    } if (!passwordValidation.isOK) {
        const error = new Notification({ isWarning: true, isWithButton: true, title: passwordValidation.message || 'Технические неполадки. Попробуйте позже' });
        error.render();
        passwordElement.classList.add('incorrect');
        return false;
    }
    loginElement.classList.remove('incorrect');
    passwordElement.classList.remove('incorrect');
    passwordAgainElement.classList.remove('incorrect');
    return true;

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
    } if (!passwordValidation.isOK) {
        const error = new Notification({ isWarning: true, isWithButton: true, title: passwordValidation.message || 'Технические неполадки. Попробуйте позже' });
        error.render();
        passwordElement.classList.add('incorrect');
        return false;
    }
    loginElement.classList.remove('incorrect');
    passwordElement.classList.remove('incorrect');
    return true;

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

export class ProfileValidators {
    static validateHeight(height: string): { isValid: boolean; message?: string } {
        const heightValue = parseInt(height);
        if (isNaN(heightValue)) {
            return { isValid: false, message: 'Рост должен быть числом' };
        }
        if (heightValue < 100 || heightValue > 250) {
            return { isValid: false, message: 'Рост должен быть от 100 до 250 см' };
        }
        return { isValid: true };
    }

    static validateGender(gender: string): { isValid: boolean; message?: string } {
        const validGenders = ['Мужчина', 'Женщина'];
        if (!validGenders.includes(gender)) {
            return { isValid: false, message: 'Укажите "Мужчина" или "Женщина"' };
        }
        return { isValid: true };
    }

    static validateBirthday(birthday: string): { isValid: boolean; message?: string } {
        const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
        if (!dateRegex.test(birthday)) {
            return { isValid: false, message: 'Формат даты: ДД.ММ.ГГГГ' };
        }

        const [day, month, year] = birthday.split('.').map(Number);
        const date = new Date(year, month - 1, day);

        if (
            date.getFullYear() !== year
			|| date.getMonth() !== month - 1
			|| date.getDate() !== day
        ) {
            return { isValid: false, message: 'Некорректная дата' };
        }

        const currentYear = new Date().getFullYear();
        if (year < 1900 || year > currentYear) {
            return { isValid: false, message: 'Год должен быть между 1900 и текущим' };
        }

        return { isValid: true };
    }
}

export function isValidName(name: string): boolean {
    return /^[a-zA-Zа-яА-ЯёЁ]{3,15}$/.test(name);
}

export function isValidSurname(surname: string): boolean {
    return /^[a-zA-Zа-яА-ЯёЁ]{3,15}$/.test(surname);
}

export function isValidHeight(height: string): boolean {
    const heightNum = parseInt(height, 10);
    return !isNaN(heightNum) && heightNum >= 100 && heightNum <= 150;
}

export function isValidBirthDate(dateStr: string): boolean {
    if (dateStr.length !== 8) { return false; }

    const day = parseInt(dateStr.substring(0, 2), 10);
    const month = parseInt(dateStr.substring(2, 4), 10);
    const year = parseInt(dateStr.substring(4, 8), 10);

    if (year < 1925 || year > 2025) { return false; }
    if (month < 1 || month > 12) { return false; }
    if (day < 1 || day > 31) { return false; }

    const date = new Date(year, month - 1, day);
    return (
	  date.getFullYear() === year
	  && date.getMonth() === month - 1
	  && date.getDate() === day
    );
}

export function isValidLocation(location: string): boolean {
    return location.length >= 3 && location.length <= 15;
}

export function isValidEmail(email: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

export function isValidPhone(phone: string): boolean {
    return /^\(\d{3}\)\d{7}$/.test(phone);
}

export function isValidNationality(nationality: string): boolean {
    return /^[a-zA-Zа-яА-ЯёЁ]{3,15}$/.test(nationality);
}

export function isValidUserData(userData: {
	firstName: string;
	lastName: string;
	height: string;
	birthDate: string;
	location: string;
	email: string;
	phone: string;
	nationality: string;
  }): boolean {
    return (
	  isValidName(userData.firstName)
	  && isValidSurname(userData.lastName)
	  && isValidHeight(userData.height)
	  && isValidBirthDate(userData.birthDate)
	  && isValidLocation(userData.location)
	  && isValidEmail(userData.email)
	  && isValidPhone(userData.phone)
	  && isValidNationality(userData.nationality)
    );
}
