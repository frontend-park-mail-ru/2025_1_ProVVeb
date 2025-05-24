import { Compounder } from '@modules/VDOM/Compounder';
import { VBC } from '@modules/VDOM/VBC';
import store from '@store';
import { VTable } from '@VDOM/compound/table/table';
import { VInput } from '@VDOM/simple/input/input';
import { VCatalog } from '@VDOM/simple/list/catalog/catalog';

export class CReg80 extends VBC {
	private data: any;

	private vars: any;

	constructor() {
		const main = new Compounder();
		const imgs = ['body', 'hair', 'eyes', 'height', 'nationality', 'alco', 'tatto', 'pirsing', 'smoke'];
		const keys = ['Телосложение', 'Цвет волос', 'Цвет глаз', 'Рост', 'Националоность', 'Отношение к алкоголю', 'Татту', 'Пирсинг', 'Отношение к курению'];
		const variants = [
			[
				{ text: 'Н/Д', value: '0' },
				{ text: 'Спортивный(ая)', value: '1' },
				{ text: 'Подтянутый(ая)', value: '2' },
				{ text: 'Полный(ая)', value: '3' },
				{ text: 'Худой(ая)', value: '4' },
				{ text: 'Среднее(ая)', value: '5' },
			],
			[
				{ text: 'Н/Д', value: '0' },
				{ text: 'Блондин(ка)', value: '1' },
				{ text: 'Рыжий(ая)', value: '2' },
				{ text: 'Шатен(ка)', value: '3' },
				{ text: 'Брюнет(ка)', value: '4' },
				{ text: 'Русый(ая)', value: '5' },
				{ text: 'Седой(ая)', value: '6' },
				{ text: 'Крашенный(ая)', value: '7' },
			],
			[
				{ text: 'Н/Д', value: '0' },
				{ text: 'Синий', value: '1' },
				{ text: 'Голубой', value: '2' },
				{ text: 'Серый', value: '3' },
				{ text: 'Зелёный', value: '4' },
				{ text: 'Карий', value: '5' },
				{ text: 'Чёрный', value: '6' },
				{ text: 'Другое', value: '7' },
			],
			undefined, undefined,
			[
				{ text: 'Н/Д', value: '0' },
				{ text: 'Негативное', value: '1' },
				{ text: 'Нейтральное', value: '2' },
				{ text: 'Положительное', value: '3' }
			],
			[
				{ text: 'Н/Д', value: '0' },
				{ text: 'Более 3', value: '1' },
				{ text: 'Нет', value: '2' },
				{ text: '1-2', value: '3' }
			],
			[
				{ text: 'Н/Д', value: '0' },
				{ text: 'Более 3', value: '1' },
				{ text: 'Нет', value: '2' },
				{ text: '1-2', value: '3' }
			],
			[
				{ text: 'Н/Д', value: '0' },
				{ text: 'Негативное', value: '1' },
				{ text: 'Нейтральное', value: '2' },
				{ text: 'Положительное', value: '3' }
			],
		];
		const data = [];
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const img = `./media/icons/preferences/${imgs[i]}.svg`;
			const value = variants[i];

			let k: VBC;
			let v: VBC;

			k = new VBC(
				`<div class="line__key">
                    <img class="key__img" src=${img}>
                    <p class="key__text">${key}</p>
                </div>`, {}, `
                    .line__key {
                        display: flex;
                        align-items: center;
                        width: fit-content;
                        height: 44px;
                        flex-direction: row;
                        gap: 11px;
                    }
                    .key__img {
                        width: 17px;
                        height: 17px;
                    }
                    .key__text{
                        font-weight: 700;
                        font-size: 15px;
                        text-align: center;
                        color: var(--accent-font-color);
                    }
                `
			);

			if (value) {
				const catalog = new VCatalog({
					placeholder: 'Н/Д',
					listVisible: false,
					options: value
				});
				v = catalog;
			} else {
				v = new VInput('-');
				v.inject(undefined, `
                    .inputContainer { 
                        width: 184px; 
                        margin-right: 8px;
                        border-bottom: 1px solid var(--gray-line);
                    }

                    .inputContainer__label {
                        left: 90px;
                    }
                    .inputContainer__input {
                        text-align: center;
                        padding-right: 0;
                    }
                `);
			}

			data.push({ key: k, value: v });
		}
		const table = new VTable(data);
		table.inject(undefined, `
            .tableBox {
                max-height: 250px;
                overflow: auto;
            }
        `);
		main.add(table);

		super(main.getTemplate());
		this.vdom = main.getVDOM();
		this.setID();

		this.data = data;
		this.vars = variants;
	}

	private updateCells(preference: any) {
		switch (preference.preference_description) {
			case 'bodyType':
				this.data[0].value.forceUpdate();
				this.data[0].value.injectProps({
					placeholder: preference.preference_value,
					listVisible: false,
					options: this.vars[0]
				});
				this.data[0].value.update();
				break;
			case 'hairColor':
				this.data[1].value.forceUpdate();
				this.data[1].value.injectProps({
					placeholder: preference.preference_value,
					listVisible: false,
					options: this.vars[1]
				});
				this.data[1].value.update();
				break;
			case 'eyeColor':
				this.data[2].value.forceUpdate();
				this.data[2].value.injectProps({
					placeholder: preference.preference_value,
					listVisible: false,
					options: this.vars[2]
				});
				this.data[2].value.update();
				break;
			case 'height':
				this.data[3].value.setValue(preference.preference_value);
				break;
			case 'nationality':
				this.data[4].value.setValue(preference.preference_value);
				break;
			case 'alco':
				this.data[5].value.forceUpdate();
				this.data[5].value.injectProps({
					placeholder: preference.preference_value,
					listVisible: false,
					options: this.vars[5]
				});
				this.data[5].value.update();
				break;
			case 'tattoo':
				this.data[6].value.forceUpdate();
				this.data[6].value.injectProps({
					placeholder: preference.preference_value,
					listVisible: false,
					options: this.vars[6]
				});
				this.data[6].value.update();
				break;
			case 'pirsing':
				this.data[7].value.forceUpdate();
				this.data[7].value.injectProps({
					placeholder: preference.preference_value,
					listVisible: false,
					options: this.vars[7]
				});
				this.data[7].value.update();
				break;
			case 'smoking':
				this.data[8].value.forceUpdate();
				this.data[8].value.injectProps({
					placeholder: preference.preference_value,
					listVisible: false,
					options: this.vars[8]
				});
				this.data[8].value.update();
				break;
		}
	}

	public updateTemplate(isMy: boolean): void {
		const profile = store.getState('myProfile') as any;
		if (isMy && profile.data) {
			for (const preference of profile.data) {
				this.updateCells(preference);
			}
		} else if (!isMy) {
			for (const preference of profile.preferences) {
				this.updateCells(preference);
			}
		}
	}

	private insert() {
		const ans = [];
		const keys = ['bodyType', 'hairColor', 'eyeColor', 'height', 'nationality', 'alco', 'tattoo', 'pirsing', 'smoking'];

		for (let i = 0; i < 9; i++) {
			if (i == 3 || i == 4) {
				ans.push({
					preference_description: keys[i],
					preference_value: this.data[i].value.getValue()
				});
				continue;
			}
			ans.push({
				preference_description: keys[i],
				preference_value: this.data[i].value.props.placeholder
			});
		}

		return ans;
	}

	public async submit(isMy: boolean): Promise<boolean> {
		const profile = store.getState('myProfile') as any;

		if (!isMy) {
			profile.preferences = this.insert();
		} else if (profile.data) {
			profile.data = this.insert();
		}

		store.setState('myProfile', profile);
		return true;
	}
}
