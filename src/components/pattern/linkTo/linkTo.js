import BaseComponent from "../../BaseComponent.js";

const DEFAULT_PARAMS_LINK = {
	idLink: "",
	linkText: "Ссылка",
};

DEFAULT_PARAMS_LINK.listenRoute = {
	eventType: "click",
	selector: "",
	callback: () => { },
};

export default class LinkTo extends BaseComponent {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = Object.assign({}, DEFAULT_PARAMS_LINK, paramsHBS);

		// Присваиваем селектор для кнопки
		if (finalParamsHBS.idLink) {
			finalParamsHBS.listenRoute.selector = `#${finalParamsHBS.idLink}`;
		}

		// Генерация шаблона
		const templateHBS = Handlebars.templates["linkTo.hbs"];
		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);

		console.log("Я ЛИНК", this);
		this.addListener(
			finalParamsHBS.listenRoute.eventType,
			finalParamsHBS.listenRoute.selector,
			finalParamsHBS.listenRoute.callback
		);
	}
}










// 	render() {
// 		// Теперь после рендера, добавляем слушатели
// 		super.render();
// 		this.attachListeners();
// 	}


// const handlers = store.getState("linkHandlers") || {};
// const callback = handlers[finalParamsHBS.idLink];

// if (callback) {
// 	this.addListener("click", finalParamsHBS.selector, callback);
// }