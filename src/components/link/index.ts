import Block from "../../core/Block";
import template from "./link.hbs";

interface TProps {
    class?: string,
    href: string,
    text: string,
}

class Link extends Block{
    constructor(props: TProps) {
        super(props);
    }

    render() {
        return template({ ...this.props });
    }
}

export default Link;
