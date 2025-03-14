export default class BasePage {
	constructor(parentElement) {
		this.parentElement = parentElement;
	}

	render() {
		throw new Error('Метод render() должен быть реализован в дочернем классе');
	}

	rerender() {
		this.parentElement.innerHTML = '';
		this.render();
	}
}
