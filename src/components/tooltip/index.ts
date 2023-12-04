import Block from '../../core/Block';
import template from './template.hbs';

import './styles.scss';

export type TToolTip = {
    isSuccess: boolean,
    isDisplay: boolean,
    text: string
}

class ToolTip extends Block<TToolTip> {
    constructor(props: TToolTip) {
        super(props);
    }

    render() {
        return template({ ...this.props });
    }
}

export default ToolTip;
