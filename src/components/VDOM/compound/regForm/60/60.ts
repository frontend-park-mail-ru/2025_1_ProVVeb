import { Compounder } from '@modules/VDOM/Compounder';
import { VirtualElement } from '@modules/VDOM/utils';
import { VBC } from '@modules/VDOM/VBC';
import store from '@store';
import { VAddButton } from '@VDOM/simple/button/addButton/addButton';
import { VInput } from '@VDOM/simple/input/input';
import { VInteresInputFull } from '@VDOM/simple/input/interesInput/interesInput';
import { VList } from '@VDOM/simple/list/list';
import { VInteres } from '@VDOM/simple/option/interest/interes';
import Notification from '@simple/notification/notification';

export class CReg60 extends VBC {
	private arr: string[];

	private intereses: VInteres[];

	private add: VAddButton;

	private main: Compounder;

	private inputs: VInteresInputFull[] = [];

	constructor() {
		const arr = ['Музыка', 'Кулинария', 'Программирование', 'Спорт',
			'Рисования', 'Видеоигры', 'Танцы', 'Рукоделие', 'Учеба',
			'Искусство', 'Наука', 'Путешествия', 'Творчество',
			'Общение', 'Саморазвитие', 'Отдых', 'Природа',
			'Технологии', 'Настольные игры', 'Книги', 'Фильмы'];

		const intereses: VInteres[] = arr.map((i: string) => new VInteres(i));
		const add = new VAddButton(() => { });

		const main = new Compounder();

		main.down('ints', `
            width: 100%;
            height: fit-content;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            align-content: flex-start;
            gap: 5px;
        `);
		for (const i of intereses) {
			main.add(i);
		}
		main.add(add);

		super(main.getTemplate());
		this.vdom = main.getVDOM();
		this.setID();

		add.injectScript('.addButton', 'click', () => {
			this.old_vdom = JSON.parse(JSON.stringify(this.vdom));
			((this.vdom as VirtualElement).children[0] as VirtualElement).children.pop();
			const buf = new VInteresInputFull();
			main.add(buf);
			add.inject(undefined, `
                .addButton {
                    margin-left: 20px;
                }
            `);
			main.add(add);
			this.update(true);
			this.inputs.push(buf);
		});

		this.arr = arr;
		this.intereses = intereses;
		this.add = add;
		this.main = main;
	}

	public updateTemplate(): void {
		const profile = store.getState('myProfile') as any;
		const ints = profile.interests;

		for (const int of ints) {
			if (!this.arr.includes(int)) {
				this.old_vdom = JSON.parse(JSON.stringify(this.vdom));
				((this.vdom as VirtualElement).children[0] as VirtualElement).children.pop();
				const buf = new VInteres(int);
				this.main.add(buf);
				this.main.add(this.add);

				this.arr.push(int);
				this.intereses.push(buf);

				this.update(true);
			}
		}

		for (const int of ints) {
			for (let i = 0; i < this.arr.length; i++) {
				if (this.arr[i] == int) {
					this.intereses[i].isChecked = false;
					this.intereses[i].setChecked();
				}
			}
		}

		for (const input of this.inputs) { (input.getDOM() as HTMLElement).style.display = 'none'; }
	}

	public getInts(): string[] {
		const ans: string[] = [];

		for (let i = 0; i < this.arr.length; i++) { if (this.intereses[i].isChecked) { ans.push(this.intereses[i].getDOM()?.textContent as string); } }

		for (const input of this.inputs) {
			const text = input.getDOM()?.textContent as string;
			if (text != '') { ans.push(text); }
		}

		return ans;
	}

	public async submit(): Promise<boolean> {
		const profile = store.getState('myProfile') as any;
		const ints = this.getInts();
		if (ints.length === 0) {
			new Notification({
				headTitle: 'Ошибка валидации',
				title: 'Вам необходимо интересоваться чем-то)',
				isWarning: true,
				isWithButton: true,
			}).render();
			return false;
		}

		profile.interests = this.getInts();

		store.setState('myProfile', profile);
		return true;
	}
}
