import template from "./template.hbs";
import Block from "../../../core/Block";
import Button from '../../../components/button';
import Input from "../../../components/input";
import Title from "../../../components/title";

import "./style.scss"


type TProps = {
    title: Title,
    formId: string,
    input: Input,
    button: Button
}

class PopupContent extends Block<TProps> {
    constructor(props: TProps) {
        super(props, "div");
    }

    render() {
        return template({ ...this.props });
    }
}

export default PopupContent;
