import EventBus from './EventBus';

class Block<PropsType extends Record<string, any> = any> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    public props: PropsType;

    public isHidden: boolean;

    private _element: HTMLElement;

    private eventBus: () => EventBus;

    private _meta: {
        tagName: string,
        attributes: Record<string, string | number>,
        props: PropsType
    };

    constructor(props: PropsType, tagName = 'div', attributes = {}) {
        const eventBus = new EventBus();

        this._meta = {
            tagName,
            attributes,
            props,
        };

        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);

        this.isHidden = false;
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _createResources() {
        const { tagName, attributes } = this._meta;
        const newElem: HTMLElement = this._createDocumentElement(tagName);
        Object.entries(attributes).forEach(([key, value]) => {
            if (typeof value === 'number') {
                value = value.toString();
            }
            newElem.setAttribute(key, value);
        });
        this._element = newElem;
    }

    private _init() {
        this._createResources();
        this.init();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected init() {
        return null;
    }

    private _componentDidMount() {
        this.componentDidMount();
    }

    componentDidMount() {
        return true;
    }

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps: PropsType, newProps: PropsType) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    protected componentDidUpdate(oldProps: PropsType, newProps: PropsType) {
        return Object.entries(newProps).some(([key, prop]) => (
            oldProps[key] !== prop
        ));
    }

    setProps = (nextProps: PropsType) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element(): HTMLElement {
        return this._element;
    }

    private _render() {
        const block = this.render();
        this._removeEvents();
        this._element.innerHTML = block;
        this._addEvents();
    }

    protected render(): string {
        throw new Error('Функция render не переопределена');
    }

    getContent() {
        return this.element;
    }

    private _makePropsProxy(props: PropsType) {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        return new Proxy(props, {
            get(target, prop: string) {
                if (prop.startsWith('_')) {
                    throw new Error('Нет прав');
                }
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop: string, value) {
                if (prop.startsWith('_')) {
                    throw new Error('Нет прав');
                }
                const oldValue = { ...target };
                target[prop as keyof PropsType] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, target);
                return true;
            },
            deleteProperty() {
                throw new Error('нет доступа');
            },
        });
    }

    private _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    show() {
        this.getContent().style.display = 'flex';
        this.isHidden = false;
    }

    hide() {
        this._element.style.display = 'none';
        this.isHidden = true;
    }

    private _addEvents() {
        const { events = {} } = this.props;
        if (events && typeof events === 'object' && Object.keys(events).length) {
            Object.keys(events).forEach((eventName) => {
                this._element.addEventListener(eventName, events[eventName as keyof typeof events], true);
            });
        }
    }

    private _removeEvents() {
        const { events = {} } = this.props;
        if (events && typeof events === 'object' && Object.keys(events).length) {
            Object.keys(events).forEach((eventName) => {
                this._element.removeEventListener(eventName, events[eventName as keyof typeof events], true);
            });
        }
    }
}

export default Block;
