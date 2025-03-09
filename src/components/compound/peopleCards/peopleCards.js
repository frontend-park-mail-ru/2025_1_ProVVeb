import BaseComponent from "../../BaseComponent.js";
import PersonCard from "../personCard/personCard.js";

const MOKS_PERSON_CARDS = [
	{
		srcPersonPicture: '/girl.jpg',
		personName: 'Катя',
		personAge: 19,
		personDescription: 'Ого...',
	},
	{
		srcPersonPicture: '/girl.jpg',
		personName: 'Макс',
		personAge: 21,
		personDescription: 'Люблю путешествовать и играть в игры.',
	},
	{
		srcPersonPicture: '/girl.jpg',
		personName: 'Анна',
		personAge: 25,
		personDescription: 'Фотографирую закаты и пеку вкусные пироги.',
	}
];

export default class PeopleCards extends BaseComponent {
	constructor(parentElement) {
		console.log(parentElement, 'перед конструктором');
		super('', parentElement);
		console.log(parentElement, 'после конструктором');
		this.currentIndex = 0;
		this.renderCard();
	}

	renderCard() {
		if (this.currentCard) {
			this.parentElement = '';
		}
		console.log(this.parentElement);
		this.currentCard = new PersonCard(this.parentElement, MOKS_PERSON_CARDS[this.currentIndex]);
		console.log(this.currentCard);
		this.currentCard.render();

		// this.currentCard.addListener('click', '#dislikeButton', () => this.handleDislike());
	}

	handleDislike() {
		this.currentIndex = (this.currentIndex + 1) % MOKS_PERSON_CARDS.length;
		this.renderCard();
	}
}
