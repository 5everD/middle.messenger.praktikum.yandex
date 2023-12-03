import template from './error.hbs';
import Block from '../../core/Block';
import Link from '../../components/link';
import Text from '../../components/text';
import Title from '../../components/title';
import { Router } from '../../core/Router';
import {TFVoid} from '../../types/void';

import './style.scss';


type TProps = {
    title: Title
    text: Text
    link: Link
    events: Record<string, TFVoid>,
}

class Error extends Block {
    constructor(props: TProps) {
        super(props, 'section', {
            class: 'error',
        });
    }

    render() {
        return template({ ...this.props });
    }
}

const router = new Router();

function handleClick(event: Event) {
    const target = event.target as HTMLElement
    if (target.className === 'link') {
        event.preventDefault();
        router.go('/messenger');
    }
}

export const page404 = new Error({
    title: new Title({
        title: '404',
        class: 'error',
    }).render(),
    text: new Text({
        class: 'error',
        text: 'Не туда попали',
    }).render(),
    link: new Link({
        href: '/messenger',
        text: 'Назад к чатам',
    }).render(),
    events: {
        click: handleClick
    },
});

export const page500 = new Error({
    title: new Title({
        title: '500',
        class: 'error',
    }).render(),
    text: new Text({
        class: 'error',
        text: 'Мы уже фиксим',
    }).render(),
    link: new Link({
        href: '/messenger',
        text: 'Назад к чатам',
    }).render(),
    events: {
        click: handleClick
    },
});
