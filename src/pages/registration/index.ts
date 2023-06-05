import template from './registration.hbs';
import Block from '../../core/Block';
import Link from '../../components/link';
import Input from '../../components/input';
import Title from '../../components/title';
import { validation } from '../../core/validations';
import { content } from './content';

import './style.scss';

type TProps = {
    events: Record<string, (event: Event) => void>,
    title: Title,
    link: Link,
    inputEmail: Input,
    inputLogin: Input,
    inputFirst: Input,
    inputSecond: Input,
    inputPhone: Input,
    inputPassword: Input,
    inputRepeatPassword: Input,
}

const registrationPage = () => {
    const { errors, values, formState, onChangeValues } = validation();
    class Registration extends Block {
        constructor(props: TProps) {
            super(props, 'form', {
                class: 'registration',
                name: 'registration',
            });
        }

        render() {
            return template({ ...this.props });
        }
    }

    function handleSubmit(event: Event) {
        event.preventDefault();
        const form = event.target as HTMLElement;
        onChangeValues(form);

        if (!formState.disabled) {
            console.log(values);
        }

        page.setProps(
            content(errors, values, formState.disabled),
        );
    }

    function handleBlurOrFocus(event: Event) {
        const input = event.target as HTMLElement;
        onChangeValues(input);
        page.setProps(
            content(errors, values, formState.disabled),
        );
    }

    const page = new Registration({
        events: {
            submit: handleSubmit,
            blur: handleBlurOrFocus,
            focus: handleBlurOrFocus,
        },
        ...content(errors, values, formState.disabled),
    });

    return page;
};

export default registrationPage;
