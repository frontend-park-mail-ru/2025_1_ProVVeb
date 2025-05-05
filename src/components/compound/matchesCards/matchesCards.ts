import BaseComponent from "@basecomp";
import api, { Profile } from '@network';
import store from "@store";
import MatchesCard from "@compound/matchCard/matchCard";
import { parseBirthday } from '@modules/tools';
import router, { AppPage } from "@modules/router";
import Notification from "@simple/notification/notification";

interface Listener {
	event: string;
	selector: string;
	callback: () => void;
}

const currentYear = new Date().getFullYear();
const ageMajority = 18;

export default class MatchesCards extends BaseComponent {
	private DATA: Profile[];
	// private isDataLoaded: boolean;
	private centralElement: HTMLElement;

	constructor(parentElement: HTMLElement) {
		super('', parentElement);
		this.DATA = [];
		// this.isDataLoaded = false;

		this.centralElement = document.createElement('div');
		this.centralElement.className = 'mainContent__central';
	}

	private async loadData(): Promise<void> {
		// if (this.isDataLoaded)
		// 	return;
		const response = await api.getMatches(store.getState('myID') as number);
		this.DATA = response.data || [];
		// // console.log(this.DATA);
		// this.isDataLoaded = true;
	}

	public async render() {
		await this.loadData();

		this.parentElement.appendChild(this.centralElement);

		let currentID: number = -1;

		//Да-да костыль... так очищаю контейнер
		let buffer = this.parentElement.querySelector('.mainContent__central');
		if (buffer)
			buffer.innerHTML = '';

		if (this.DATA.length == 0 && buffer)
			buffer.innerHTML = 'Любовь никогда не дремлет. Она скоро тебя найдет!';

		for (let data of this.DATA as Profile[]) {
			currentID++;

			let finalPersonInterests: string[];
			if(data.interests.length > 5){
				finalPersonInterests = data.interests.slice(0, 3);
				finalPersonInterests.push("...");
			}else{
				finalPersonInterests = data.interests;
			}

			const currentCard = new MatchesCard(
				this.centralElement,
				{
					srcPersonPicture: data.photos[0] !== api.BASE_URL
						? api.BASE_URL_PHOTO + data.photos[0]
						: '',
					personName: data.firstName,
					personAge: (parseBirthday(data.birthday)?.year ?? ageMajority),
					personDescription: data.description,
					personInterests: finalPersonInterests,
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
						callback: () => this.handleMessage(data.profileId),
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
		// console.log("Button Like Match is worked!");
	}

	private async handleMessage(id: number): Promise<void> {
		const firstID = store.getState("myID") as number;
		const respond = await api.createChat(firstID, id);
		if(respond.success){
			router.navigateTo(AppPage.Messenger);
		}else{
			new Notification({
				headTitle: "Что-то пошло не так...",
				title: "Ошибка сети. Попробуйте позже",
				isWarning: false,
				isWithButton: true
			}).render();
		}
	}
}
