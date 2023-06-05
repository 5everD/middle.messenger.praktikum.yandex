import template from './change-password.hbs';
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
    inputOldPassword: Input,
    inputNewPassword: Input,
    inputRepeatPassword: Input
}

const changePWD = () => {
    const { errors, values, formState, onChangeValues } = validation();
    class ChangePWD extends Block {
        constructor(props: TProps) {
            super(props, 'form', {
                class: 'change-password',
                name: 'change-password',
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

    const page = new ChangePWD({
        events: {
            submit: handleSubmit,
            blur: handleBlurOrFocus,
            focus: handleBlurOrFocus,
        },
        ...content(errors, values, formState.disabled),
    });

    return page;
};

export default changePWD;
