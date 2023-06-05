import Button from "../../components/button";
import Input from "../../components/input";
import Link from "../../components/link";
import Title from "../../components/title";

type TData = {
    oldPassword?: string,
    newPassword?: string,
    repeatPassword?: string
}

const className = "change-password"

export const content = (errors: TData, values: TData) => ({
    title: new Title({
        class: className,
        title: "Смена пароля",
    }).render(),

    inputOldPassword: new Input({
        class: className,
        name: "oldPassword",
        label: "Старый пароль",
        value: values.oldPassword,
        errorText: errors.oldPassword,
        type: "password",
    }).render(),

    inputNewPassword: new Input({
        class: className,
        name: "newPassword",
        label: "Новый пароль",
        value: values.newPassword,
        errorText: errors.newPassword,
        type: "password",
    }).render(),

    inputRepeatPassword: new Input({
        class: className,
        name: "repeatPassword",
        label: "Повторите новый пароль",
        value: values.repeatPassword,
        errorText: errors.repeatPassword,
        type: "password",
    }).render(),

    button: new Button({
        text: "Сохранить",
    }).render(),

    link: new Link({
        href: "/profile",
        text: "отмена",
    }).render(),
});
