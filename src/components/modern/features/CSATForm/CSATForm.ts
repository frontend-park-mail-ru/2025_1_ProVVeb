import { VStatCard } from "@features/statCard/statCard";
import { VComp } from "@ui/form/comp/comp";
import { Compounder } from "@VDOM/Compounder";
import { VBC } from "@VDOM/VBC";

interface comp_params {
	login: string,
	point: number,
	date: string,
	review: string
}

export class VCSAT extends VBC {
	private main: Compounder;

	constructor() {
		super('<div></div>');
		this.main = new Compounder();
	}

	private loadData(): comp_params[] { //ЗДЕСЬ БУДЕТ РУЧКА
		return [
			{ login: "Даня Юдин", point: 3, date: "27.05.2025 2:41", review: "Помогите!" },
			{ login: "Шахмар", point: 2, date: "27.05.2025 3:41", review: "Помогите!" },
			{ login: "Андрей", point: 4, date: "27.05.2025 4:41", review: "Помогите!" },
			{ login: "Антон", point: 1, date: "27.05.2025 5:41", review: "Помогите!" },
			{ login: "Артем", point: 5, date: "27.05.2025 6:41", review: "Помогите!" }
		];
	}

	public insertData() {
		const data = this.loadData();

		this.main.delete();
		this.main.clear();
		this.main.down('cards', `
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 10px;
		`)

		for (let i of data) {
			const el = new VStatCard(i.login, i.point, i.date, i.review);
			this.main.add(el);
		}

		this.inject(this.main.getTemplate());
		this.vdom = this.main.getVDOM();
		this.setID();
	}
}
