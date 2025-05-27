import { VComp } from "@ui/form/comp/comp";
import { Compounder } from "@VDOM/Compounder";
import { VBC } from "@VDOM/VBC";

interface comp_params {
	from: string,
	to: string,
	title: string,
	date: string
}

export class VComps extends VBC {
	private main: Compounder;

	constructor() {
		super('<div></div>');
		this.main = new Compounder();
	}

	private loadData(): comp_params[] { //ЗДЕСЬ БУДЕТ РУЧКА
		return [
			{ from: 'Даня Юдин', to: 'Саша Сарафанников', title: 'Я устал бро...', date: '27.05.2025 1:38' },
			{ from: 'Даня Юдин', to: 'Саша Сарафанников', title: 'Я устал бро...', date: '27.05.2025 1:38' },
			{ from: 'Даня Юдин', to: 'Саша Сарафанников', title: 'Я устал бро...', date: '27.05.2025 1:38' },
			{ from: 'Даня Юдин', to: 'Саша Сарафанников', title: 'Я устал бро...', date: '27.05.2025 1:38' },
			{ from: 'Даня Юдин', to: 'Саша Сарафанников', title: 'Я устал бро...', date: '27.05.2025 1:38' }
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
			const el = new VComp(i.from, i.to, i.title, i.date);
			this.main.add(el);
		}

		this.inject(this.main.getTemplate());
		this.vdom = this.main.getVDOM();
		this.setID();
	}
}
