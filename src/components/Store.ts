class Store {
	private static instance: Store;
	private state: Record<string, unknown>;
	private listeners: Record<string, ((value: unknown) => void)[]>;

	private constructor() {
		this.state = {};
		this.listeners = {};
	}

	public static getInstance(): Store {
		if (!Store.instance) {
			Store.instance = new Store();
		}
		return Store.instance;
	}

	public setState(key: string, value: unknown): void {
		this.state[key] = value;
		this.notify(key);
	}

	public getState<T>(key: string): T | undefined {
		return this.state[key] as T;
	}

	public subscribe(key: string, callback: (value: unknown) => void): void {
		if (!this.listeners[key]) {
			this.listeners[key] = [];
		}
		this.listeners[key].push(callback);
	}

	private notify(key: string): void {
		if (this.listeners[key]) {
			this.listeners[key].forEach((callback) => callback(this.state[key]));
		}
	}
}

const store = Store.getInstance();
store.setState('notif_layer', document.getElementById('notif_layer'));

export default store;
