import BaseComponent from "../../BaseComponent.js";
import PersonCard from "../personCard/personCard.js";

const MOCK_PERSON_CARDS = [
	{
		srcPersonPicture: '/mock/girl.jpg',
		personName: 'Катя',
		personAge: 19,
		personDescription: 'Ого...',
	},
	{
		srcPersonPicture: '/mock/pudg.jpg',
		personName: 'Макс',
		personAge: 21,
		personDescription: 'Люблю путешествовать и играть в игры.',
	},
	{
		srcPersonPicture: '/mock/sofia.jpg',
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

		const LISTENERS_ACTION_BTNS = [
			{
				event: 'click',
				selector: '#dislikeButton',
				callback: () => this.handleDislike(),
			},
			{
				event: 'click',
				selector: '#likeButton',
				callback: () => this.handleLike(),
			},
			{
				event: 'click',
				selector: '#repeatButton',
				callback: () => this.handleRepeat(),
			},
			{
				event: 'click',
				selector: '#starButton',
				callback: () => this.handleStar(),
			},
			{
				event: 'click',
				selector: '#lightningButton',
				callback: () => this.handleLightning(),
			},
		];

		this.currentCard = new PersonCard(
			this.parentElement,
			MOCK_PERSON_CARDS[this.currentIndex],
			LISTENERS_ACTION_BTNS,
		);

		this.currentCard.render();
	}

	handleDislike() {
		this.currentIndex = (this.currentIndex + 1) % MOCK_PERSON_CARDS.length;
		console.log('Тык дизлайк');
		this.render();
	}

	handleLike() {
		this.currentIndex = (this.currentIndex + 1) % MOCK_PERSON_CARDS.length;
		console.log('Тык лайк');
		this.render();
	}

	handleRepeat() {
		console.log('Тык повторить');
	}

	handleStar() {
		console.log('Тык звезда');
	}
	handleLightning() {
		console.log('Тык молния');
	}
}
