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
		srcPersonPicture: '/123.jpg',
		personName: 'Макс',
		personAge: 21,
		personDescription: 'Люблю путешествовать и играть в игры.',
	},
	{
		srcPersonPicture: '/sofia.jpg',
		personName: 'Анна',
		personAge: 25,
		personDescription: 'Фотографирую закаты и пеку вкусные пироги.',
	}
];

export default class PeopleCards extends BaseComponent {
	constructor(parentElement) {
		super('', parentElement);
		this.currentIndex = 0;
	}

	render() {
		if (this.currentCard) {
			document.getElementById('idPersonCard').outerHTML = '';
		}

		this.currentCard = new PersonCard(this.parentElement, MOKS_PERSON_CARDS[this.currentIndex],
			[
				{
					event: 'click', selector: '#dislikeButton', callback: () => this.handleDislike()
				},
				{
					event: 'click', selector: '#likeButton', callback: () => this.handleLike()
				}
			]
		);

		this.currentCard.render();

		this.currentCard.addListener('click', '#dislikeButton', () => this.handleDislike());
		this.currentCard.addListener('click', '#likeButton', () => this.handleLike());
		this.currentCard.attachListeners();
	}

	handleDislike() {
		this.currentIndex = (this.currentIndex + 1) % MOKS_PERSON_CARDS.length;
		console.log('dislike');
		this.render();
	}

	handleLike() {
		this.currentIndex = (this.currentIndex + 1) % MOKS_PERSON_CARDS.length;
		console.log('like');
		this.render();
	}
}
