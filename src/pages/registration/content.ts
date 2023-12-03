import Button from '../../components/button';
import Input from '../../components/input';
import Link from '../../components/link';
import Title from '../../components/title';

type TData = {
    email?: string;
    login?: string,
    first_name?: string,
    second_name?: string,
    phone?: string,
    password?: string,
    repeatPassword?: string,
}

const className = 'registration';

export const content = (errors: TData, values: TData, isFormDisabled: boolean) => ({
    title: new Title({
        class: className,
        title: 'Регистрация',
    }).render(),

    inputEmail: new Input({
        class: className,
        name: 'email',
        label: 'Почта',
        value: values.email,
        errorText: errors.email,
        type: 'email',
    }).render(),

    inputLogin: new Input({
        class: className,
        name: 'login',
        label: 'Логин',
        value: values.login,
        errorText: errors.login,
        type: 'text',
    }).render(),

    inputFirst: new Input({
        class: className,
        name: 'first_name',
        label: 'Имя',
        value: values.first_name,
        errorText: errors.first_name,
        type: 'text',
    }).render(),

    inputSecond: new Input({
        class: className,
        name: 'second_name',
        label: 'Фамилия',
        value: values.second_name,
        errorText: errors.second_name,
        type: 'text',
    }).render(),

    inputPhone: new Input({
        class: className,
        name: 'phone',
        label: 'Телефон',
        value: values.phone,
        errorText: errors.phone,
        type: 'tel',
    }).render(),

    inputPassword: new Input({
        class: className,
        name: 'password',
        label: 'Пароль',
        value: values.password,
        errorText: errors.password,
        type: 'password',
    }).render(),

    inputRepeatPassword: new Input({
        class: className,
        name: 'repeatPassword',
        label: 'Пароль (еще раз)',
        value: values.repeatPassword,
        errorText: errors.repeatPassword,
        type: 'password',
    }).render(),

    button: new Button({
        text: 'Зарегистрироваться',
        disabled: isFormDisabled,
    }).render(),

    link: new Link({
        href: '/',
        text: 'Войти',
    }).render(),
});
