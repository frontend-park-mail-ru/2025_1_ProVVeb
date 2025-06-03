import { VStatCard } from "@features/statCard/statCard";
import { VComp } from "@ui/form/comp/comp";
import { Compounder } from "@VDOM/Compounder";
import { VBC } from "@VDOM/VBC";

interface comp_params {
	answer: string,
	description: string,
	login: string,
	maxScore: number,
	minScore: number,
	name: string,
	score: number,
	userId: number,
}

export class VCSAT extends VBC {
	private main: Compounder;
	private feedbacks: comp_params[];

	constructor(feedbacks: []) {
		super('<div></div>');
		this.main = new Compounder();
		this.feedbacks = feedbacks;
	}

	public insertData() {
		this.main.delete();
		this.main.clear();
		this.main.down('cards', `
			width: 100%;
			height: 60dvh;
    		overflow-y: scroll;
			overflow-x: hidden;
		`)

		this.feedbacks.forEach(i => {
			const el = new VStatCard(
				i.login,
				Math.floor(5 * i.score / (i.maxScore - i.minScore + 1)),
				'',
				i.answer,
				i.userId,
				i.name,
			);
			this.main.add(el);
		});

		this.inject(this.main.getTemplate());
		this.vdom = this.main.getVDOM();
		this.setID();
	}
}
