import BaseComponent from "@basecomp";
import api, { Profile } from '@network';
import store from "@store";
import MatchesCard from "@compound/matchCard/matchCard";
import { parseBirthday } from '@modules/tools';

interface Listener {
	event: string;
	selector: string;
	callback: () => void;
}

const currentYear = new Date().getFullYear();
const ageMajority = 18;

export default class MatchesCards extends BaseComponent {
	private DATA: Profile[];
	private isDataLoaded: boolean;
	private centralElement: HTMLElement;

	constructor(parentElement: HTMLElement) {
		super('', parentElement);
		this.DATA = [];
		this.isDataLoaded = false;

		this.centralElement = document.createElement('div');
		this.centralElement.className = 'mainContent__central';
	}

	private async loadData(): Promise<void> {
		if (this.isDataLoaded)
			return;
		const response = await api.getMatches(store.getState('myID') as number);
		this.DATA = response.data || [];
		this.isDataLoaded = true;
	}

	public async render() {
		await this.loadData();

		this.parentElement.appendChild(this.centralElement);

		let currentID: number = -1;

		//Да-да костыль... так очищаю контейнер
		let buffer = this.parentElement.querySelector('.mainContent__central');
		if (buffer)
			buffer.innerHTML = '';

		for (let data of this.DATA as Profile[]) {
			currentID++;
			console.log(data);

			const currentCard = new MatchesCard(
				this.centralElement,
				{
					srcPersonPicture: data.card !== api.BASE_URL
						? data.card
						: '',
					personName: data.firstName,
					personAge: (parseBirthday(data.birthday)?.year ?? ageMajority),
					personDescription: data.description,
					personInterests: data.interests,
					id: currentID,
				},
				[
					{
						event: 'click',
						selector: `#matchDeleteBtn${currentID}`,
						callback: (e: Event) => this.handleDelete(e),
					},
					{
						event: 'click',
						selector: `#matchLikeBtn${currentID}`,
						callback: () => this.handleLike(),
					},
					{
						event: 'click',
						selector: `#matchMessageBtn${currentID}`,
						callback: () => this.handleMessage(),
					},
				]
			);

			currentCard.render();
		}
	}

	private handleDelete(e: Event): void {
		const target = e.currentTarget as HTMLElement;
		const card = target.closest('.matchCard');
		card?.remove();
	}

	private handleLike(): void {
		console.log("Button Like Match is worked!");
	}

	private handleMessage(): void {
		console.log("Button Message to matcher is worked!");
	}
}
