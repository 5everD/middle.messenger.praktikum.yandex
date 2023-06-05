import Block from "../../core/Block";
import template from "./text.hbs";

type TProps = {
    text: string,
    class: string,
}

class Text extends Block<TProps> {
    constructor(props: TProps) {
        super(props);
    }

    render() {
        return template({ ...this.props });
    }
}

export default Text;
