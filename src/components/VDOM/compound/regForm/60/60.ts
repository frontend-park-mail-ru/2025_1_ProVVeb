import { Compounder } from "@modules/VDOM/Compounder";
import { VBC } from "@modules/VDOM/VBC";
import { VAddButton } from "@VDOM/simple/button/addButton/addButton";
import { VInput } from "@VDOM/simple/input/input";
import { VInteresInputFull } from "@VDOM/simple/input/interesInput/interesInput";
import { VList } from "@VDOM/simple/list/list";
import { VInteres } from "@VDOM/simple/option/interest/interes";

export class CReg60 extends VBC {
    constructor(){
        const arr = ["Музыка", "Кулинария", "Программирование", "Спорт",
            "Рисования", "Видеоигры", "Танцы", "Рукоделие", "Учеба",
            "Искусство", "Наука", "Путешествия", "Творчество",
            "Общение", "Саморазвитие", "Отдых", "Природа",
            "Технологии", "Настольные игры", "Книги", "Фильмы" ];
        
        const intereses: VBC[] = arr.map((i: string)=>{
            return new VInteres(i);
        })
        const add = new VAddButton(()=>{
            this.old_vdom = JSON.parse(JSON.stringify(this.vdom));
            add.delete();
            main.add(new VInteresInputFull());
            add.inject(undefined, `
                .addButton {
                    margin-left: 20px;
                }
            `);
            main.add(add);
            this.update();
        });

        const main = new Compounder();
        
        main.down("ints", `
            width: 100%;
            height: fit-content;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            align-content: flex-start;
            gap: 5px;
        `);
        for(let i of intereses)
            main.add(i);
        main.add(add);

        super(main.getTemplate());
        this.vdom = main.getVDOM();
        this.setID();
    }
}