import Block from './Block';

function render(selector: string, component: Block<Record<string, unknown>>) {
    const root = document.querySelector(selector);
    if (root) {
        root.innerHTML = '';
        root.append(component.getContent());
    }
    return root;
}

export default render;
