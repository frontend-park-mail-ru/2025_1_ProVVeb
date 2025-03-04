class Store {
    constructor() {
        if (Store.instance) {
            return Store.instance;
        }
        this.state = {};
        this.listeners = {};
        Store.instance = this;
    }

    setState(key, value) {
        this.state[key] = value;
        this.notify(key);
    }

    getState(key) {
        return this.state[key];
    }

    subscribe(key, callback) {
        if (!this.listeners[key]) {
            this.listeners[key] = [];
        }
        this.listeners[key].push(callback);
    }

    notify(key) {
        if (this.listeners[key]) {
            this.listeners[key].forEach(callback => callback(this.state[key]));
        }
    }
}

const store = new Store();
export default store;