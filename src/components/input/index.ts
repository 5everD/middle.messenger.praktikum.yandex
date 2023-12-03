import Block from '../../core/Block';
import template from './input.hbs';

type TProps = {
    class: string,
    type: string,
    name: string,
    label: string,
    disabled?: boolean,
    value?: string,
    errorText?: string,
    accept?: string,
}

class Input extends Block<TProps> {
    constructor(props: TProps) {
        super(props);
    }

    render() {
        return template({ ...this.props });
    }
}

export default Input;
