import template from './template.hbs';
import Block from '../../core/Block';

type TProps = {
    content: unknown,
    isOpen: boolean
}
class Popup extends Block<TProps> {
    constructor(props: TProps) {
        super(props, 'div');
    }

    render() {
        return template({ ...this.props});
    }
}

export default Popup;
