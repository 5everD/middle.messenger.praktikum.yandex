export type TKeys =
    'login' |
    'password' |
    'oldPassword' |
    'newPassword' |
    'repeatPassword' |
    'first_name' |
    'second_name' |
    'email' |
    'phone' |
    'message';

export type TValidationsData = {
    [key in TKeys]?: string;
};

type TFormState = {
    disabled: boolean
};

const isValidLogin = (value: string): string => {
    if (value.length < 3 || value.length > 20) return 'Введите от 3 до 20 символов';
    if (/^[0-9]+$/.test(value)) return 'Логин не может состоять только за цифр';
    if (!/^[a-zA-Z0-9\_\-]+$/.test(value)) {
        return 'Допустима латиница, дефис, а так же нижнее подчеркивание';
    }
    return '';
};

const isValidPassword = (value: string): string => {
    if (value.length < 8 || value.length > 40) return 'Введите от 8 до 40 символов';
    if (!/[А-ЯA-Z]/.test(value)) return 'Необходима хотя бы одна заглавная буква';
    if (!/[0-9]/.test(value)) return 'Необходима хотя бы одна цифра';
    return '';
};

const isValidName = (value: string) => {
    if (!/^[А-ЯA-Z]/.test(value)) return 'Первая буква должна быть заглавной';
    if (!/^[a-zA-Zа-яёА-ЯЁ\-]+$/.test(value)) return 'Допустима кириллица, латиница и дефис';
    return '';
};

const isValidEmail = (value: string): string => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) return 'Не корретный e-mail';
    return '';
};

const isValidPhone = (value: string): string => {
    if (value.length < 10 || value.length > 15) return 'Введите от 10 до 15 цифр';
    if (!/^\+?[0-9]+$/.test(value)) return 'Допустимы только цифры, может начинается с плюса';
    return '';
};

const isValidMessage = (value: string): string => {
    if (value.length === 0) return 'Сообщение не может быть пустым';
    return '';
};

export function validation() {
    const errors: TValidationsData = {};
    const values: TValidationsData = {};
    const formState: TFormState = {
        disabled: false,
    };

    const _setValues = (newValues: TValidationsData = {}) => {
        Object.entries(newValues).forEach(([key, value]: [TKeys, string]) => {
            values[key] = value;
        });
    };

    const _setErrors = (values: TValidationsData = {}) => {
        Object.entries(values).forEach(([key, value]: [TKeys, string]) => {
            switch (key) {
            case 'login':
                errors[key] = isValidLogin(value);
                break;
            case 'password':
                errors[key] = isValidPassword(value);
                break;
            case 'oldPassword':
                errors[key] = isValidPassword(value);
                break;
            case 'newPassword':
                errors[key] = isValidPassword(value);
                break;
            case 'repeatPassword':
                errors[key] = isValidPassword(value);
                break;
            case 'first_name':
                errors[key] = isValidName(value);
                break;
            case 'second_name':
                errors[key] = isValidName(value);
                break;
            case 'email':
                errors[key] = isValidEmail(value);
                break;
            case 'phone':
                errors[key] = isValidPhone(value);
                break;
            case 'message':
                errors[key] = isValidMessage(value);
                break;
            }
        });
    };

    const _setDisabledForm = () => {
        formState.disabled = Object.values(errors).some((err) => err.length !== 0);
    };

    const init = (initValues: TValidationsData = {}): void => {
        _setValues(initValues);
        _setErrors(initValues);
        _setDisabledForm();
    };

    const onChangeValues = (elem: HTMLElement) => {
        let newValues = {};
        if (elem instanceof HTMLInputElement) {
            newValues = _getInputData(elem);
        } else {
            newValues = _getFormData(elem);
        }
        _setValues(newValues);
        _setErrors(newValues);
        _setDisabledForm();
    };

    const _getFormData = (elem: HTMLElement) => {
        const inputsNodeList = elem.querySelectorAll('input');
        const inputs: HTMLInputElement[] = Array.from(inputsNodeList);
        const formValues: Record<string, string> = {};
        inputs.forEach((input) => {
            formValues[input.name] = input.value;
        });
        return formValues;
    };

    const _getInputData = (elem: HTMLInputElement) => {
        const { name, value } = elem;
        const valueObj: Record<string, string> = {};
        valueObj[name] = value;
        return valueObj;
    };

    return {
        errors, values, formState, init, onChangeValues,
    };
}
