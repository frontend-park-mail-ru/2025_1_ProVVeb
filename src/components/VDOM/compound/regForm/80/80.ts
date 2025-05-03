import { Compounder } from "@modules/VDOM/Compounder";
import { VBC } from "@modules/VDOM/VBC";
import { VTable } from "@VDOM/compound/table/table";
import { VInput } from "@VDOM/simple/input/input";
import { CatalogOption, VCatalog } from "@VDOM/simple/list/catalog/catalog";

export class CReg80 extends VBC {
    constructor(){
        const main = new Compounder();
        const imgs = ['body', 'hair', 'eyes', 'height', 'nationality', 'alco', 'tatto', 'pirsing', 'smoke'];
        const keys = ['Телосложение', 'Цвет волос', 'Цвет глаз', 'Рост', 'Националоность', 'Отношение к алкоголю', 'Татту', 'Пирсинг', 'Отношение к курению'];
        const variants = [
            [
                {text: "Н/Д", value: "0"},
                {text: "Спортивный(ая)", value: "1"},
                {text: "Подтянутый(ая)", value: "2"},
                {text: "Полный(ая)", value: "3"},
                {text: "Худой(ая)", value: "4"},
                {text: "Среднее(ая)", value: "5"},
            ],
            [
                {text: "Н/Д", value: "0"},
                {text: "Блондин(ка)", value: "1"},
                {text: "Рыжий(ая)", value: "2"},
                {text: "Шатен(ка)", value: "3"},
                {text: "Брюнет(ка)", value: "4"},
                {text: "Русый(ая)", value: "5"},
                {text: "Седой(ая)", value: "6"},
                {text: "Крашенный(ая)", value: "7"},
            ],
            [
                {text: "Н/Д", value: "0"},
                {text: "Синий", value: "1"},
                {text: "Голубой", value: "2"},
                {text: "Серый", value: "3"},
                {text: "Зелёный", value: "4"},
                {text: "Карий", value: "5"},
                {text: "Чёрный", value: "6"},
                {text: "Другое", value: "7"},
            ],
            undefined, undefined,
            [
                {text: "Н/Д", value: "0"},
                {text: "Негативное", value: "1"},
                {text: "Нейтральное", value: "2"},
                {text: "Положительное", value: "3"}
            ],
            [
                {text: "Н/Д", value: "0"},
                {text: "Более 3", value: "1"},
                {text: "Нет", value: "2"},
                {text: "1-2", value: "3"}
            ],
            [
                {text: "Н/Д", value: "0"},
                {text: "Более 3", value: "1"},
                {text: "Нет", value: "2"},
                {text: "1-2", value: "3"}
            ],
            [
                {text: "Н/Д", value: "0"},
                {text: "Негативное", value: "1"},
                {text: "Нейтральное", value: "2"},
                {text: "Положительное", value: "3"}
            ],
        ];
        const data = [];
        for(let i=0;i<keys.length;i++){
            const key = keys[i];
            const img = './media/icons/preferences/'+imgs[i]+'.svg';
            const value = variants[i];
            
            let k: VBC;
            let v: VBC;

            k = new VBC(
                `<div class="line__key">
                    <img class="key__img" src=${img}>
                    <p class="key__text">${key}</p>
                </div>`, {},
                `
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

            if(value){
                const catalog = new VCatalog({
                    placeholder: 'Н/Д',
                    listVisible: false,
                    options: value
                });
                v = catalog;
            }else{
                v = new VInput("-");
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
                console.log(v.getVDOM());
            }

            data.push({key: k, value: v});
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
    }
}