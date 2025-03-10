import BaseComponent from '../../BaseComponent.js';
import PersonCard from '../personCard/personCard.js';
import api from '../../../modules/network.js'
import store from '../../Store.js';

const currentYear = new Date().getFullYear();

export default class PeopleCards extends BaseComponent {
	constructor(parentElement) {
		super('', parentElement);
		this.currentIndex = 0;
		this.CARDS = [];
		this.isDataLoaded = false;
	}

	async loadData() {
		if (!this.isDataLoaded) {
			const response = await api.getProfiles(store.getState("myID"));
			this.CARDS = response.data || [];
			this.isDataLoaded = true;
		}
	}

	async render() {
		if (this.currentCard) {
			document.getElementById('idPersonCard').outerHTML = '';
		}
		await this.loadData();

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
			{
				personName: this.CARDS[this.currentIndex].firstName,
				personAge: currentYear - Number(this.CARDS[this.currentIndex].Birthday.year),
				personDescription: this.CARDS[this.currentIndex].description,
				srcPersonPicture: this.CARDS[this.currentIndex].card !== api.BASE_URL
					? this.CARDS[this.currentIndex].card
					: '',
			},
			LISTENERS_ACTION_BTNS,
		);

		this.currentCard.render();
	}

	handleDislike() {
		this.currentIndex = (this.currentIndex + 1) % this.CARDS.length;
		console.log('Тык дизлайк');
		this.render();
	}

	handleLike() {
		this.currentIndex = (this.currentIndex + 1) % this.CARDS.length;
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


// const MOCK_PERSON_CARDS = [
// 	{
// 		srcPersonPicture: '/mock/girl.jpg',
// 		personName: 'Катя',
// 		personAge: 19,
// 		personDescription: 'Ого...',
// 	},
// 	{
// 		srcPersonPicture: '/mock/pudg.jpg',
// 		personName: 'Макс',
// 		personAge: 21,
// 		personDescription: 'Люблю путешествовать и играть в игры.',
// 	},
// 	{
// 		srcPersonPicture: '/mock/sofia.jpg',
// 		personName: 'Анна',
// 		personAge: 25,
// 		personDescription: 'Фотографирую закаты и пеку вкусные пироги.',
// 	}
// ];