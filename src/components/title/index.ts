import Block from '../../core/Block';
import template from './title.hbs';

type TProps = {
    title: string,
    class: string,
}

class Title extends Block<TProps> {
    constructor(props: TProps) {
        super(props);
    }

    render() {
        return template({ ...this.props });
    }
}

export default Title;
