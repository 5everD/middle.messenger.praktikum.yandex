import template from "./template.hbs";
import Block from "../../../core/Block";
import Button from '../../../components/button';
import Title from "../../../components/title";
import Input from "../../../components/input";

import "./style.scss"


type TProps = {
    title: Title
    avatarInput: Input
    button: Button
}
class AvatarPopup extends Block<TProps> {
    constructor(props: TProps) {
        super(props, "div");
    }

    render() {
        return template({ ...this.props });
    }
}

export default AvatarPopup;
