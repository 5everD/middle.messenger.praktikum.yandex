import template from "./profile.hbs";
import Block from "../../core/Block";
import Link from "../../components/link";
import Input from "../../components/input";
import Title from "../../components/title";
import Avatar from "../../components/avatar";
import Button from "../../components/button";
import {validation} from "../../core/validations";
import {content} from "./content";

import './style.scss'


export type TProps = {
    events: Record<string, (event: Event) => void>,
    avatar: Avatar,
    title: Title,
    inputEmail: Input,
    inputLogin: Input,
    inputFirst: Input,
    inputSecond: Input,
    inputDisplayName: Input,
    inputPhone: Input,
    linkChangeData: Link,
    linkChangePass: Link,
    button: Button,
    linkExit: Link,
}

const profilePage = (edit: boolean = false) => {
    const {errors, values, init: initValidator, formState, onChangeValues} = validation();

    const initValues = {
        email: 'pochta@yandex.ru',
        login: 'ivanivanov',
        first_name: 'Иван',
        second_name: 'Иванов',
        display_name: 'Иван',
        phone: '+79099673030',
    };

    initValidator(initValues);

    class Profile extends Block {
        constructor(props: TProps) {
            super(props, 'div', {
                class: 'inner',
            });
        };

        render() {
            return template({...this.props});
        };
    }

    function handleChange(event: Event) {
        const target = event.target as HTMLElement

        if (target.className === 'link edit') {
            edit = true;
        }

        page.setProps(
            content(errors, values, edit, formState.disabled)
        );
    }

    function handleSubmit(event: Event) {
        event.preventDefault();
        const form = event.target as HTMLElement;
        onChangeValues(form);

        if (!formState.disabled) {
            edit = false
        }

        page.setProps(
            content(errors, values, edit, formState.disabled)
        );
    }

    function handleBlurOrFocus(event: Event) {
        const input = event.target as HTMLElement;
        onChangeValues(input);
        page.setProps(
            content(errors, values, edit, formState.disabled)
        );
    }

    const page = new Profile({
        events: {
            submit: handleSubmit,
            blur: handleBlurOrFocus,
            focus: handleBlurOrFocus,
            click: handleChange,
        },
        ...content(errors, values, edit, formState.disabled)
    });

    return page;
};

export default profilePage;
