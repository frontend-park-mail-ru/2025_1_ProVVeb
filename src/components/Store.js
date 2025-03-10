/**
 * Класс хранилища (Store) реализует паттерн Singleton для управления состоянием приложения.
 */
class Store {
	/**
	 * Создаёт экземпляр хранилища или возвращает уже существующий.
	 */
	constructor() {
		if (Store.instance) {
			return Store.instance;
		}
		this.state = {};
		this.listeners = {};
		Store.instance = this;
	}

	/**
	 * Устанавливает значение состояния и уведомляет подписчиков.
	 * @param {string} key - Ключ состояния.
	 * @param {*} value - Значение состояния.
	 */
	setState(key, value) {
		this.state[key] = value;
		this.notify(key);
	}

	/**
	 * Получает значение состояния по ключу.
	 * @param {string} key - Ключ состояния.
	 * @returns {*} Значение состояния.
	 */
	getState(key) {
		return this.state[key];
	}

	/**
	 * Подписывает коллбэк на изменение состояния по указанному ключу.
	 * @param {string} key - Ключ состояния.
	 * @param {Function} callback - Функция-обработчик изменений.
	 */
	subscribe(key, callback) {
		if (!this.listeners[key]) {
			this.listeners[key] = [];
		}
		this.listeners[key].push(callback);
	}

	/**
	 * Уведомляет всех подписчиков о изменении состояния по ключу.
	 * @param {string} key - Ключ состояния.
	 */
	notify(key) {
		if (this.listeners[key]) {
			this.listeners[key].forEach((callback) => callback(this.state[key]));
		}
	}
}

/**
 * Экземпляр хранилища.
 * @constant {Store}
 */
const store = new Store();
store.setState('notif_layer', document.getElementById('notif_layer'));
export default store;
