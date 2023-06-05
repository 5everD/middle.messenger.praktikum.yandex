import template from './main.hbs';
import Block from '../../core/Block';

type link = {
    href: string;
    text: string;
};

type TProps = {
    pages: link[];
}

class Main extends Block {
    constructor(props: TProps) {
        super(props, 'nav', {
            class: 'menu',
        });
    }

    render() {
        return template({ ...this.props });
    }
}

const pages = [
    { href: '/auth', text: 'Войти' },
    { href: '/registration', text: 'Зарегистрироваться' },
    { href: '/change-password', text: 'Поменять пароль' },
    { href: '/profile', text: 'Профиль' },
    { href: '/chat', text: 'Чат' },
    { href: '/404', text: '404' },
    { href: '/500', text: '500' },
];
const main = new Main({ pages });

export default main;
