import Block from '../../core/Block';
import template from './button.hbs';

type TProps = {
    class?: string,
    text: string,
    disabled?: boolean,
    form?: string
}

class Button extends Block {
    constructor(props: TProps) {
        super(props);
    }

    render() {
        return template({ ...this.props });
    }
}

export default Button;
