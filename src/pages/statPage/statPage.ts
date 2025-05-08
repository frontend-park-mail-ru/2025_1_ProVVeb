import BasePage from '../BasePage';
import { Compounder } from '@modules/VDOM/Compounder';
import HeaderMain from '@compound/headerMain/headerMain';
import NavMenu from '@compound/navMenu/navMenu';
import { VBC } from '@modules/VDOM/VBC';
import { VStatTable } from '@VDOM/compound/statTable/statTable';
import { VStatCard } from '@VDOM/compound/statCard/statCard';
import api from '@network';
import store from '@store';

function getCards(cards: StatParams[]): VBC[] {
	let ans: VBC[] = [];

	for (let card of cards) {
		const statCard = new VStatCard(card.login, card.score, card.answer) as VBC;
		if (card.name == "CSAT")
			ans.push(statCard);
	}

	return ans;
}

function getDATA(cards: StatParams[]) {
	let ans = { n: 0, min: 5, max: 0 };

	for (let card of cards) {
		if (card.name == "CSAT") {
			ans.min = Math.min(ans.min, card.score);
			ans.max = Math.max(ans.max, card.score);
			ans.n += 1;
			console.log(card);
		}
	}

	return ans;
}

interface StatParams {
	name: string,
	description: string,
	minScore: number,
	maxScore: number,
	login: string,
	answer: string,
	score: number
}

function getSum(cards: StatParams[]): number {
	let ans = 0;
	for (let card of cards)
		if (card.name == "CSAT")
			ans += card.score;
	return ans;
}

export default class StatPage extends BasePage {
	private components: Array<HeaderMain | NavMenu>;
	private contentWrapper: HTMLElement;
	private compounder1: Compounder = new Compounder;
	private compounder2: Compounder = new Compounder;
	private cards: StatParams[];

	private async loadData(): Promise<void> {
		const response = await api.getCards();
		this.cards = response.data as StatParams[];
	}

	constructor(parentElement: HTMLElement) {
		super(parentElement);

		this.contentWrapper = document.createElement('div');
		this.contentWrapper.className = 'mainContent';

		this.components = [
			new HeaderMain(parentElement),
			new NavMenu(this.contentWrapper),
		];
		this.cards = [];
	}

	async render(): Promise<void> {
		this.compounder1.clear();
		this.compounder2.clear();
		await this.loadData();
		let table = new VStatTable(0, 0, 5, 2.5)
		if (this.cards.length !== 0) {
			const data = getDATA(this.cards);
			const n = data.n;
			const min = data.min;
			const max = data.max;
			const avg = Number((getSum(this.cards) / n).toFixed(2));
			table = new VStatTable(n, min, max, avg);
		}


		this.compounder1.down('mainContent__central', '');
		for (let card of getCards(this.cards))
			this.compounder1.add(card);

		this.compounder2.down('mainContent__right', '');
		this.compounder2.add(table);

		this.contentWrapper.innerHTML = '';
		this.components[0].render();
		this.parentElement.appendChild(this.contentWrapper);
		this.components[1].render();

		this.compounder1.addTo(this.contentWrapper);
		this.compounder2.addTo(this.contentWrapper);

		store.update('ava');
		store.update('profileName');
	}

	public getNavMenu(): NavMenu {
		return this.components[1] as NavMenu;
	}
}
