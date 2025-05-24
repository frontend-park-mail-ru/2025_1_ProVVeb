import { VBC } from '@modules/VDOM/VBC';
import { Compounder } from '@modules/VDOM/Compounder';
import { CSS_center } from 'src/components/VDOM/defaultStyles/VStyles';
import templateHBS from './dateInput.hbs';

type CharType = 'digit' | 'slash';

interface CharData {
	value: string;
	isDigit: boolean;
	isActive: boolean;
}

function formatToDisplay(value: string, activeIndex: number = -1): CharData[] {
	const result: CharData[] = [];

	const pushDigit = (v: string, index: number) => {
		result.push({
			value: v || 'X',
			isDigit: true,
			isActive: activeIndex === index
		});
	};

	pushDigit(value[0] || 'D', 0);
	pushDigit(value[1] || 'D', 1);
	result.push({ value: '/', isDigit: false, isActive: false });
	pushDigit(value[2] || 'M', 2);
	pushDigit(value[3] || 'M', 3);
	result.push({ value: '/', isDigit: false, isActive: false });
	pushDigit(value[4] || 'Y', 4);
	pushDigit(value[5] || 'Y', 5);
	pushDigit(value[6] || 'Y', 6);
	pushDigit(value[7] || 'Y', 7);

	return result;
}

export class VDateInput extends VBC {
	private ui: VDateInputUI;

	constructor() {
		super(
			`<div><input type="text" class="date-input__hidden-input" maxlength="8" placeholder="DDMMYYYY">
            <div class="date-input__disclaimer">Возраст будет публичен</div></div>`,
			{},
			'',
			[
				{
					selector: '.date-input__hidden-input',
					eventType: 'input',
					handler: (e) => {
						const input = e.target as HTMLInputElement;
						const rawValue = input.value.replace(/\D/g, '').slice(0, 8);
						input.value = rawValue;

						const pos = input.selectionStart ?? 0;
						const digitIndex = [...rawValue].slice(0, pos).length;

						ui.injectProps({ chars: formatToDisplay(rawValue, digitIndex) });
						ui.update();
					}
				},
				{
					selector: '.date-input__hidden-input',
					eventType: 'blur',
					handler: (e) => {
						const input = e.target as HTMLInputElement;
						const rawValue = input.value.replace(/\D/g, '').slice(0, 8);

						ui.injectProps({ chars: formatToDisplay(rawValue, -1) });
						ui.update();
					}
				}
			]
		);

		const compounder = new Compounder();
		const ui = new VDateInputUI();
		compounder.down('.date-input-box', 'position: relative;');
		compounder.add(ui);
		compounder.add(this);

		this.inject(compounder.getTemplate());
		this.ui = ui;
	}

	public setDate(text: string): void {
		const element = this.getDOM()?.querySelector('input') as HTMLInputElement;
		element.value = text;
		this.ui.injectProps({ chars: formatToDisplay(text) });
		this.ui.forceUpdate();
		this.ui.update();
	}

	public getDate(): string {
		const element = this.getDOM()?.querySelector('input') as HTMLInputElement;
		return element.value;
	}

	public markInvalid(): void {
		this.getDOM()?.classList.add('date-input--invalid');
	}

	public unmarkInvalid(): void {
		this.getDOM()?.classList.remove('date-input--invalid');
	}
}

export class VDateInputUI extends VBC {
	constructor(initialValue: string = '') {
		super(
			templateHBS,
			{ chars: formatToDisplay(initialValue) },
			'',
			[]
		);
	}
}
