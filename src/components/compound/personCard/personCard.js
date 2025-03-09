import BaseComponent from "../../BaseComponent.js";

const DEFAULT_PARAMS_PERSON_CARD = {
	srcPersonPictureError: 'media/error/400x600.jpg',
	srcPersonPicture: '/girl.jpg',
	personName: 'Имя',
	personAge: 16,
	personDescription: 'Краткое описание человека...',
};

const LISTENERS_ACTION_BTNS = [
	{
		event: 'click',
		selector: '#repeatButton',
		callback: () => console.log('Повторить'),
	},
	{
		event: 'click',
		selector: '#dislikeButton',
		callback: () => console.log('Дизлайк'),
	},
	{
		event: 'click',
		selector: '#starButton',
		callback: () => console.log('Звезда'),
	},
	{
		event: 'click',
		selector: '#likeButton',
		callback: () => console.log('Лайк'),
	},
	{
		event: 'click',
		selector: '#lightningButton',
		callback: () => console.log('Молния'),
	},
];

export default class PersonCard extends BaseComponent {
	constructor(parentElement, paramsHBS = {}) {
		const finalParamsHBS = { ...DEFAULT_PARAMS_PERSON_CARD, ...paramsHBS };
		const templateHBS = Handlebars.templates['personCard.hbs'];
		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);

		LISTENERS_ACTION_BTNS.forEach(({ event, selector, callback }) => {
			this.addListener(event, selector, callback);
		});
	}
}
