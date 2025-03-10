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

/**
 * Базовый компонент для рендеринга HTML-шаблонов и управления событиями.
 */
export default class BaseComponent {
	/**
	 * Создаёт экземпляр базового компонента.
	 * @param {string} template - HTML-шаблон компонента.
	 * @param {HTMLElement} parentElement - Родительский элемент, в который будет рендериться компонент.
	 */
	constructor(template, parentElement) {
		this.template = template;
		this.parentElement = parentElement;
		this.listeners = [];
	}

	/**
	 * Рендерит компонент в родительский элемент.
	 */
	render() {
		if (this.parentElement.innerHTML == '') {
			this.parentElement.innerHTML = this.template;
			this.attachListeners();
			return;
		}
		this.parentElement.insertAdjacentHTML('beforeend', this.template);
		this.attachListeners();
	}

	/**
	 * Получает HTML-код отрендеренного компонента.
	 * @returns {string} HTML-содержимое родительского элемента.
	 */
	getRenderedComponent() {
		return this.parentElement.innerHTML;
	}

	/**
	 * Добавляет обработчик событий к элементу внутри компонента.
	 * @param {string} eventType - Тип события (например, 'click').
	 * @param {string} selector - CSS-селектор элемента, к которому применяется обработчик.
	 * @param {Function} callback - Функция-обработчик события.
	 */
	addListener(eventType, selector, callback) {
		this.listeners.push({ eventType, selector, callback });
	}

	/**
	 * Удаляет все обработчики событий, добавленные ранее.
	 */
	removeListeners() {
		this.listeners.forEach((listener) => {
			this.parentElement.querySelector(listener.selector)
				.removeEventListener(listener.eventType, listener.callback);
		});
		this.listeners = [];
	}

	/**
	 * Присоединяет все зарегистрированные обработчики событий к соответствующим элементам.
	 */
	attachListeners() {
		this.listeners.forEach((listener) => {
			const element = this.parentElement.querySelector(listener.selector);
			if (element) {
				element.addEventListener(listener.eventType, listener.callback);
			}
		});
	}
}