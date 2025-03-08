import BaseComponent from "../../BaseComponent.js";
import store from "../../Store.js";

const DEFAULT_PARAMS_LINK = {
	idLink: "iiiiii",
	linkText: "Ссылка",
};

// DEFAULT_PARAMS_LINK.listenRoute = {
// 	eventType: "click",
// 	selector: "",
// 	callback: () => { },
// };

export default class LinkTo extends BaseComponent {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = Object.assign({}, DEFAULT_PARAMS_LINK, paramsHBS);

		// if (finalParamsHBS.idLink) {
		// 	finalParamsHBS.listenRoute.selector = `#${finalParamsHBS.idLink}`;
		// }

		const templateHBS = Handlebars.templates["linkTo.hbs"];
		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);

		// const handlers = store.getState("linkHandlers") || {};
		// const callback = handlers[finalParamsHBS.idLink];

		// if (callback) {
		// 	this.addListener("click", finalParamsHBS.selector, callback);
		// }

		// this.addListener(	
		// 	finalParamsHBS.listenRoute.eventType,
		// 	finalParamsHBS.listenRoute.selector,
		// 	finalParamsHBS.listenRoute.callback
		// );
		// console.log(this.listeners);
	}
}