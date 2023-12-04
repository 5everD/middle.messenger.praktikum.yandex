import Block from './Block';
import render from './Render';

type TProps = { rootQuery: string };

class Route {
    _pathname: string;
    _page: Block<Record<string, unknown>>;
    _props: TProps;

    constructor(pathname: string, page: Block<Record<string, unknown>>, props: TProps) {
        this._pathname = pathname;
        this._page = page;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    render() {
        if (!this._page.isHidden) {
            render(this._props.rootQuery, this._page);
            return;
        }

        this._page.show();
    }
}

export class Router {
    _rootQuery: string;
    routes: Route[]
    static __instance: Router;
    history: History;

    constructor(rootQuery?: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._rootQuery = rootQuery ? rootQuery : '#root';

        Router.__instance = this;
    }

    use(pathname: string, page: Block<Record<string, unknown>>) {
        const route = new Route(pathname, page, {rootQuery: this._rootQuery});
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = (event: PopStateEvent) => {
            if (event.currentTarget !== null) {
                this._onRoute((event.currentTarget as HTMLFormElement).location.pathname);
            }
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        let route = this.getRoute(pathname);

        if (!route) {
            route = this.getRoute('*');
            if (!route) return;
        }

        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back()
    }


    forward() {
        this.history.forward()
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}
