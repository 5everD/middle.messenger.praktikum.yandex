import Block from './Block';

function render(selector: string, component: Block<Record<string, unknown>>) {
    const root = document.querySelector(selector);
    root!.innerHTML = '';
    root!.appendChild(component.getContent());
    return root;
}

export default render;
