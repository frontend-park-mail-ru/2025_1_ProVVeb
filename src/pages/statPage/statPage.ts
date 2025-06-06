import { Compounder } from '@VDOM/Compounder';
import HeaderMain from '@compound/headerMain/headerMain';
import NavMenu from '@compound/navMenu/navMenu';
import { VBC } from '@VDOM/VBC';
import { VStatTable } from '@features/statTable/statTable';
import { VStatCard } from '@features/statCard/statCard';
import api from '@network';
import store from '@store';
import BasePage from '../BasePage';

function getCards(cards: StatParams[]): VBC[] {
	const ans: VBC[] = [];

	for (const card of cards) {
		const statCard = new VStatCard(card.login, card.score, card.answer) as VBC;
		if (card.name == 'CSAT') { ans.push(statCard); }
	}

	return ans;
}

function getDATA(cards: StatParams[]) {
	const ans = { n: 0, min: 5, max: 0 };

	for (const card of cards) {
		if (card.name == 'CSAT') {
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
	for (const card of cards) { if (card.name == 'CSAT') { ans += card.score; } }
	return ans;
}

export default class StatPage extends BasePage {
	private components: Array<HeaderMain | NavMenu>;

	private contentWrapper: HTMLElement;

	private compounder1: Compounder = new Compounder();

	private compounder2: Compounder = new Compounder();

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
		let table = new VStatTable(0, 0, 5, 2.5);
		if (this.cards.length !== 0) {
			const data = getDATA(this.cards);
			const { n } = data;
			const { min } = data;
			const { max } = data;
			const avg = Number((getSum(this.cards) / n).toFixed(2));
			table = new VStatTable(n, min, max, avg);
		}

		this.compounder1.down('mainContent__central', '');
		for (const card of getCards(this.cards)) { this.compounder1.add(card); }

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
		store.update('premiumBorder');
	}

	public getNavMenu(): NavMenu {
		return this.components[1] as NavMenu;
	}
}
