import BaseComponent from '@basecomp';
import api, { Profile } from '@network';
import store from '@store';
import { parseBirthday } from '@modules/tools';
import PersonCard from '../personCard/personCard';

interface Listener {
	event: string;
	selector: string;
	callback: () => void;
}

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

	private async loadData(): Promise<void> {
		if (!this.isDataLoaded) {
			const response = await api.getProfiles(store.getState('myID') as number);
			this.CARDS = response.data || [];
			this.isDataLoaded = true;
		}
	}

	public async render(): Promise<void> {
		if (this.currentCard) {
			document.getElementById('idPersonCard')?.remove();
		}

		await this.loadData();

		const LISTENERS_ACTION_BTNS: Listener[] = [
			{
				event: 'click',
				selector: '#dislikeButton',
				callback: async () => {
					const card = document.querySelector('.personCard');
					card?.classList.add('personCard--disliked');
					await this.handleDislike();
				},
			},
			{
				event: 'click',
				selector: '#likeButton',
				callback: async () => {
					const card = document.querySelector('.personCard');
					card?.classList.add('personCard--liked');
					await this.handleLike();
				},
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
				personId: this.CARDS[this.currentIndex].profileId,
				personName: this.CARDS[this.currentIndex].firstName,
				personAge: parseBirthday(this.CARDS[this.currentIndex].birthday)?.year ?? '≥ 18',
				personDescription: this.CARDS[this.currentIndex].description,
				srcPersonPhotos: this.CARDS[this.currentIndex].photos.map(
					(photoPath: string) => `${api.BASE_URL_PHOTO}${photoPath}`
				),
				isSinglePhoto: this.CARDS[this.currentIndex].photos.length === 1,
			},
			LISTENERS_ACTION_BTNS,
		);

		this.currentCard.render();
	}

	private animateDelay = 400;

	private async handleDislike(): Promise<void> {
		const likeFrom = store.getState('myID') as number;
		const likeTo = this.CARDS[this.currentIndex].profileId;
		await api.Dislike(likeFrom, likeTo);

		await new Promise((resolve) => setTimeout(resolve, this.animateDelay));

		this.currentIndex = (this.currentIndex + 1) % this.CARDS.length;
		await this.render();
	}

	private async handleLike(): Promise<void> {
		const likeFrom = store.getState('myID') as number;
		const likeTo = this.CARDS[this.currentIndex].profileId;
		await api.Like(likeFrom, likeTo);

		await new Promise((resolve) => setTimeout(resolve, this.animateDelay));

		this.currentIndex = (this.currentIndex + 1) % this.CARDS.length;
		await this.render();
	}

	private handleRepeat(): void { }

	private handleStar(): void { }

	private handleLightning(): void { }
}
