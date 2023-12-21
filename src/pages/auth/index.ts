import template from './auth.hbs';
import Block from '../../core/Block';
import Link from '../../components/link';
import Input from '../../components/input';
import Title from '../../components/title';
import { validation } from '../../core/Validations';
import { content } from './content';
import { Router } from '../../core/Router';
import { TLoginValues, authApi } from '../../api/AuthApi';

import './style.scss';


type TProps = {
    events?: Record<string, (event: Event) => void>,
    title: Title,
    link: Link,
    inputLogin: Input,
    inputPassword: Input
}

const authPage = () => {
    const { errors, values, formState, onChangeValues } = validation();
    const router = new Router();

    class Auth extends Block<TProps> {
        constructor(props: TProps) {
            super(props, 'form', {
                class: 'auth',
                name: 'auth',
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

        if ( !formState.disabled ) {
            authApi.login(values as TLoginValues)
                .then((res: string) => {
                    console.log(res)
                    if ( res === 'OK' ) {
                        router.go('/messenger');
                    }
                })
                .catch(err => console.log('error --->', err));
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

    function handleClick(event: Event) {
        const target = event.target as HTMLElement;
        if ( target.className === 'link' ) {
            event.preventDefault();
            router.go('/sign-up');
        }
    }

    const page = new Auth({
        events: {
            submit: handleSubmit,
            blur: handleBlurOrFocus,
            focus: handleBlurOrFocus,
            click: handleClick,
        },
        ...content(errors, values, formState.disabled),
    });

    return page;
};

export default authPage;
