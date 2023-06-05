import Button from '../../components/button';
import Input from '../../components/input';
import Link from '../../components/link';
import Title from '../../components/title';

type TData = {
    login?: string,
    password?: string,
}

export const content = (errors: TData, values: TData, isFormDisabled: boolean) => ({
    title: new Title({
        class: 'auth',
        title: 'Вход',
    }).render(),

    inputLogin: new Input({
        class: 'auth',
        name: 'login',
        label: 'Логин',
        value: values.login,
        errorText: errors.login,
        type: 'text',
    }).render(),

    inputPassword: new Input({
        class: 'auth',
        name: 'password',
        label: 'Пароль',
        value: values.password,
        errorText: errors.password,
        type: 'password',
    }).render(),

    button: new Button({
        text: 'Авторизоваться',
        disabled: isFormDisabled,
    }).render(),

    link: new Link({
        href: 'registration',
        text: 'Нет аккаунта?',
    }).render(),
});
