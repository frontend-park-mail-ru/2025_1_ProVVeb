import BaseComponent from '@basecomp';
import api, { Profile } from '@network';
import store from '@store';
import { parseBirthday } from '@modules/utils';
import Notification from '@simple/notification/notification';
import PersonCard from '../personCard/personCard';
import router, { AppPage } from '@modules/router';

function toPrimeClass(border: number): string {
	const classMap: Record<number, string> = {
		0: 'cyberpunk-wave-border',
		1: 'neon-explosion-border',
		2: 'gold-barrier-border',
		3: 'pink-cotton-border',
		4: 'dark-matter-border',
	};
	return classMap[border] ?? '';
}

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
	private canGoBack: boolean;

	constructor(parentElement: HTMLElement) {
		super('', parentElement);
		this.currentIndex = 0;
		this.CARDS = [];
		this.isDataLoaded = false;
		this.currentCard = null;
		this.canGoBack = false;
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
				isPersonPremium: this.CARDS[this.currentIndex].Premium.Status,
				personBorderClass: this.CARDS[this.currentIndex].Premium.Status ?
					toPrimeClass(this.CARDS[this.currentIndex].Premium.Border) :
					'',
				isAccountPremium: store.getState('isPremium') as boolean,

			},
			LISTENERS_ACTION_BTNS,
		);

		this.currentCard.render();
	}

	private animateDelay = 400;

	private async handleDislike(): Promise<void> {
		const likeFrom = store.getState('myID') as number;
		const likeTo = this.CARDS[this.currentIndex].profileId;

		const btns = document.querySelector('.personCard__btns') as HTMLElement;
		if (btns) {
			btns.style.pointerEvents = 'none';
			btns.style.opacity = '0.6';
		}

		await api.Dislike(likeFrom, likeTo);
		this.canGoBack = true;

		await new Promise(resolve => setTimeout(resolve, this.animateDelay));
		this.currentIndex = (this.currentIndex + 1) % this.CARDS.length;
		await this.render();

		if (btns) {
			btns.style.pointerEvents = 'auto';
			btns.style.opacity = '1';
		}
	}

	private async handleLike(): Promise<void> {
		const likeFrom = store.getState('myID') as number;
		const likeTo = this.CARDS[this.currentIndex].profileId;

		const btns = document.querySelector('.personCard__btns') as HTMLElement;
		if (btns) {
			btns.style.pointerEvents = 'none';
			btns.style.opacity = '0.6';
		}

		await api.Like(likeFrom, likeTo);
		this.canGoBack = true;

		await new Promise(resolve => setTimeout(resolve, this.animateDelay));
		this.currentIndex = (this.currentIndex + 1) % this.CARDS.length;
		await this.render();

		if (btns) {
			btns.style.pointerEvents = 'auto';
			btns.style.opacity = '1';
		}
	}

	private async handleRepeat(): Promise<void> {
		if (this.currentIndex === 0) {
			new Notification({
				headTitle: '🚫 Возврат недоступен',
				title: 'Вы находитесь в начале списка',
				isWarning: false,
				isWithButton: true,
			}).render();
			return;
		}

		if (!this.canGoBack) {
			new Notification({
				headTitle: '⏪ Доступен только один возврат',
				title: 'Вы уже вернулись к предыдущей карточке',
				isWarning: false,
				isWithButton: true,
			}).render();
			return;
		}

		this.currentIndex--;
		this.canGoBack = false;
		await this.render();
	}

	private async handleStar(): Promise<void> {
		const likeFrom = store.getState('myID') as number;
		const likeTo = this.CARDS[this.currentIndex].profileId;

		await api.SuperLike(likeFrom, likeTo);
		this.canGoBack = false;
		this.currentIndex = (this.currentIndex + 1) % this.CARDS.length;
		router.navigateTo(AppPage.Matches);
	}

	private async handleLightning(): Promise<void> {
		const btns = document.querySelector('.personCard__btns') as HTMLElement;
		if (btns) {
			btns.style.pointerEvents = 'none';
			btns.style.opacity = '0.6';
		}

		const notificationWS = store.getState('notificationWS') as WebSocket;
		notificationWS.send(JSON.stringify({
			type: 'sendFlowers',
			payload: {
				user_id: this.CARDS[this.currentIndex].profileId,
			}
		}));

		this.canGoBack = false;

		await new Promise(resolve => setTimeout(resolve, this.animateDelay));
		this.currentIndex = (this.currentIndex + 1) % this.CARDS.length;
		await this.render();

		if (btns) {
			btns.style.pointerEvents = 'auto';
			btns.style.opacity = '1';
		}
	}
}
