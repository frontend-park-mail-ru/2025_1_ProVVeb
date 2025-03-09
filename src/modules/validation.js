export const validator = (data, rules) => {
    let error = '';
    for(let rule of rules)
        if(!rule.reg.test(data))
            error=rule.message;

    return error=='' ? {isOK: true, message: null} : {isOK: false, message: error}; 
}

const EMOJI = /^[\u0000-\u1F5FF\u1F680-\u1F6FF\u1F900-\u1F9FF]+$/;

export const LOGIN_RULES = [
    {
        reg: EMOJI,
        message: "Пароль не может содержать эмоджи!",
    },
    {
        reg: /^.{10,}$/,
        message: "Логин не может быть меньше 10 символов!",
    },
    {
        reg: /^.{1,15}$/,
        message: "Логин не может быть больше 15 символов!",
    },
    {
        reg: /^[a-zA-Z0-9._%+-]{4,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,}$/,
        message: "Недопустимые символы!",
    }
]

export const PASSWORD_RULES = [
    {
        reg: EMOJI,
        message: "Пароль не может содержать эмоджи!",
    },
    {
        reg: /^.{8,}$/,
        message: "Пароль не может быть меньше 8 символов!",
    },
    {
        reg: /^.{1,64}$/,
        message: "Пароль не может быть больше 64 символов!",
    }, 
    {
        message: 'Пароль должен содержать только латинские буквы и цифры',
        regex: /^[a-zA-Z0-9]*$/,
    },
]