import { Compounder } from "@modules/VDOM/Compounder";
import { VBC } from "@modules/VDOM/VBC";
import { VInput } from "@VDOM/simple/input/input";
import { VList } from "@VDOM/simple/list/list";

export class CReg40 extends VBC {
    constructor(){
        const educ = new VInput("Учебное заведение");
        const mail = new VInput("Почтовый адрес");

        const list = new VList();
        const phone = new VInput("(012) 345-67-89");

        const main = new Compounder();
        main.add(educ);
        main.add(mail);
        main.down(".phoneInput", `
            width: 100%;
            height: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row;
        `);
        main.add(list);
        main.add(phone);

        super(main.getTemplate());
        this.vdom = main.getVDOM();
        this.setID();
    }
}