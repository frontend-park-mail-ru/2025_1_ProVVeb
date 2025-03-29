import PersonCard from '../personCard/personCard';
import BaseComponent from '@basecomp';
import api, { Profile } from '@network';
import store from '@store';
import { parseBirthday } from '@modules/tools';

interface Listener {
	event: string;
	selector: string;
	callback: () => void;
}

const currentYear = new Date().getFullYear();
const ageMajority = 18;

export default class PeopleCards extends BaseComponent {
	private currentIndex: number;
	private CARDS: Profile[];
	private isDataLoaded: boolean;
	private currentCard: PersonCard | null;

	constructor(parentElement: HTMLElement) {
		super('', parentElement);
		this.currentIndex = 0;
		this.CARDS = [];
		this.isDataLoaded = false;
		this.currentCard = null;
	}

	// Метод для загрузки данных
	private async loadData(): Promise<void> {
		if (!this.isDataLoaded) {
			const response = await api.getProfiles(store.getState('myID') as number);
			this.CARDS = response.data || [];
			this.isDataLoaded = true;
		}
	}

	// Метод для рендеринга карточки
	public async render(): Promise<void> {
		if (this.currentCard) {
			document.getElementById('idPersonCard')?.remove();
		}

		await this.loadData();

		const LISTENERS_ACTION_BTNS: Listener[] = [
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
				personAge: currentYear - (parseBirthday(this.CARDS[this.currentIndex].birthday)?.year ?? ageMajority),
				personDescription: this.CARDS[this.currentIndex].description,
				srcPersonPicture: this.CARDS[this.currentIndex].card !== api.BASE_URL
					? this.CARDS[this.currentIndex].card
					: '',
			},
			LISTENERS_ACTION_BTNS,
		);

		this.currentCard.render();
	}

	private handleDislike(): void {
		this.currentIndex = (this.currentIndex + 1) % this.CARDS.length;
		console.log('Тык дизлайк');
		this.render();
	}

	private handleLike(): void {
		this.currentIndex = (this.currentIndex + 1) % this.CARDS.length;
		console.log('Тык лайк');
		this.render();
	}

	private handleRepeat(): void {
		console.log('Тык повторить');
	}

	private handleStar(): void {
		console.log('Тык звезда');
	}

	private handleLightning(): void {
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
// 		srcPersonPicture: '/mock/man.jpg',
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
