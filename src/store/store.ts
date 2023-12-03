import EventBus from '../core/EventBus';
import set from '../utils/set';

export enum StoreEvents {
    Updated = 'updated',
}

class Store extends EventBus {
    private state: any = {};

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);
        this.emit(StoreEvents.Updated, this.getState());
    }
}

export default new Store();
