import template from "./auth.hbs";
import Block from "../../core/Block";
import Link from "../../components/link";
import Input from "../../components/input";
import Title from "../../components/title";
import {validation} from "../../core/validations";
import {content} from "./content";

import './style.scss';


type TProps = {
    events: Record<string, (event: Event) => void>,
    title: Title,
    link: Link,
    inputLogin: Input,
    inputPassword: Input
}

const authPage = () => {
    const {errors, values, onChangeValues} = validation();

    class Auth extends Block {
        constructor(props: TProps) {
            super(props, 'form', {
                class: 'auth',
                name: 'auth',
            });
        };

        render() {
            return template({...this.props});
        };
    }

    function handleSubmit(event: Event) {
        event.preventDefault();
        const form = event.target as HTMLElement;
        onChangeValues(form);
        page.setProps(
            content(errors, values)
        );
    }

    function handleBlurOrFocus(event: Event) {
        const input = event.target as HTMLElement;
        onChangeValues(input);
        page.setProps(
            content(errors, values)
        );
    }

    const page = new Auth({
        events: {
            submit: handleSubmit,
            blur: handleBlurOrFocus,
            focus: handleBlurOrFocus,
        },
        ...content(errors, values)
    });

    return page;
}

export default authPage;
