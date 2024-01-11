import { expect } from 'chai';
import Block from './Block';
import { JSDOM } from 'jsdom';

describe('Проверяем Block', () => {
    beforeEach(() => {
        const dom = new JSDOM(
            '<!DOCTYPE html><body><main id="main"></main></body>',
            { url: 'http://localhost:3000' }
        );

        (global as any).window = dom.window;
        global.document = dom.window.document;
    })

    class NewComponent extends Block<{ title: string }> {
        constructor(props: { title: string }) {
            super(props, 'div');
        }

        render() {
            return `<h1>${this.props.title}</h1>`;
        }
    }

    it('Хранение пропсов', () => {
        const newComponent = new NewComponent({
            title: 'Hello',
        });
        expect(newComponent.props.title).to.eq('Hello');
    });

    it('Изменение пропсов', () => {
        const newComponent = new NewComponent({
            title: 'Hello',
        });
        newComponent.setProps({ title: 'Hello world!' })
        expect(newComponent.props.title).to.eq('Hello world!');
    });

    it('Hide Component', () => {
        const newComponent = new NewComponent({
            title: 'Hello',
        });
        newComponent.hide();
        expect(newComponent.isHidden).to.eq(true);
    });

    it('Show Component', () => {
        const newComponent = new NewComponent({
            title: 'Hello',
        });
        newComponent.hide();
        newComponent.show();
        expect(newComponent.isHidden).to.eq(false);
    });
});
