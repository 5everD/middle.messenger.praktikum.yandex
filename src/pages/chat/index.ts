import template from "./chat.hbs";
import Block from "../../core/Block";
import Link from "../../components/link";
import {massages, name, massage, TMassages, TMassage} from "./data";
import {validation} from "../../core/validations";
import {content} from "./content";

import "./style.scss"


type TChatProps = {
    events: Record<string, (event: Event) => void>,
    massages: TMassages[],
    massage: TMassage[]
    name: string,
    link: Link
}

const chatPage = () => {
    const { errors, /*values,*/ formState, /*init: validatorInit,*/ onChangeValues } = validation();

    class ChatPage extends Block {
        constructor(props: TChatProps) {
            super(props, 'div', {
                class: 'inner'
            })
        }

        render() {
            return template({ ...this.props });
        }
    }

    function handleClick(event: Event) { //TODO
        const target = event.target as HTMLElement

        if (target.className === 'link edit') {
            // edit = true;
        }

        page.setProps(
            content(errors, name, massage, massages)
        );
    }

    function handleSubmit(event: Event) { //TODO
        event.preventDefault();
        const form = event.target as HTMLElement;
        onChangeValues(form);

        if (!formState.disabled) {
            // edit = false
        }

        page.setProps(
            content(errors, name, massage, massages)
        );
    }

    function handleBlurOrFocus(event: Event) { //TODO
        const input = event.target as HTMLElement;
        onChangeValues(input);
        page.setProps(
            content(errors, name, massage, massages)
        );
    }

    const page = new ChatPage({
        events: {
            submit: handleSubmit,
            blur: handleBlurOrFocus,
            focus: handleBlurOrFocus,
            click: handleClick,
        },
        ...content(errors, name, massage, massages)
    });

    return page;
};

export default chatPage;
