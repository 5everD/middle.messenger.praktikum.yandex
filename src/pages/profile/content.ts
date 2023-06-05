import Avatar from '../../components/avatar';
import Button from '../../components/button';
import Input from '../../components/input';
import Link from '../../components/link';
import Title from '../../components/title';

type TData = {
    email?: string,
    login?: string,
    first_name?: string,
    second_name?: string,
    display_name?: string,
    phone?: string,
};

const className = 'profile';
export const content = (errors: TData, values: TData, edit: boolean, isFormDisabled: boolean) => ({
    edit,
    avatar: new Avatar({
        class: className,
        image: '',
    }).render(),

    title: new Title({
        class: className,
        title: values.display_name || values.first_name || 'Пользователь',
    }).render(),

    inputEmail: new Input({
        class: className,
        type: 'email',
        name: 'email',
        label: 'Почта',
        value: values.email,
        errorText: errors.email,
        disabled: !edit,
    }).render(),

    inputLogin: new Input({
        class: className,
        type: 'text',
        name: 'login',
        label: 'Логин',
        value: values.login,
        errorText: errors.login,
        disabled: !edit,
    }).render(),

    inputFirst: new Input({
        class: className,
        type: 'text',
        name: 'first_name',
        label: 'Имя',
        value: values.first_name,
        errorText: errors.first_name,
        disabled: !edit,
    }).render(),

    inputSecond: new Input({
        class: className,
        type: 'text',
        name: 'second_name',
        label: 'Фамилия',
        value: values.second_name,
        errorText: errors.second_name,
        disabled: !edit,
    }).render(),

    inputDisplayName: new Input({
        class: className,
        type: 'text',
        name: 'display_name',
        label: 'Имя в чате',
        value: values.display_name,
        errorText: errors.display_name,
        disabled: !edit,
    }).render(),

    inputPhone: new Input({
        class: className,
        type: 'tel',
        name: 'phone',
        label: 'Телефон',
        value: values.phone,
        errorText: errors.phone,
        disabled: !edit,
    }).render(),

    linkChangeData: new Link({
        class: edit ? 'display-none' : 'link edit',
        href: '#',
        text: 'Изменить данные',
    }).render(),

    linkChangePass: new Link({
        class: !edit ? 'link' : 'display-none',
        href: '/change-password',
        text: 'Изменить пароль',
    }).render(),

    button: new Button({
        class: edit ? '' : 'display-none',
        text: 'Сохранить',
        form: 'profile',
        disabled: isFormDisabled,
    }).render(),

    linkExit: new Link({
        class: 'link logout',
        href: '/auth',
        text: 'Выйти',
    }).render(),
});
