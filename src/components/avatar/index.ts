import Block from "../../core/Block";
import template from "./avatar.hbs";

type TProps = {
    class: string,
    image: string;
}

class Avatar extends Block<TProps> {
    constructor(props: TProps) {
        super(props, 'div', {class: props.class + '__avatar'});
    }

    render() {
        return template({ ...this.props });
    }
}

export default Avatar;
