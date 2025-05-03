import { Compounder } from "@modules/VDOM/Compounder";
import { VBC } from "@modules/VDOM/VBC";
import { VInput } from "@VDOM/simple/input/input";
import { VOption } from "@VDOM/simple/option/option";
import { VDateInput } from "@VDOM/simple/input/dateInput/dateInput";
import { CSS_center } from "@VDOM/defaultStyles/VStyles";

export class CReg20 extends VBC {
    constructor(){
        const main = new Compounder();
        
        const name = new VInput("Имя");
        name.inject(undefined, '.inputContainer { width: 336px; }');
        const surname = new VInput("Фамилия");
        surname.inject(undefined, '.inputContainer { width: 336px; }');
        
        const option1 = new VOption("Мужчина");
        const option2 = new VOption("Женщина");
        
        option1.inject(undefined, '', [{
            selector: '.option',
            eventType: 'click',
            handler: ()=>{
                option1.getDOM()?.classList.add("option-checked");
                option2.getDOM()?.classList.remove("option-checked");
            }
        }]);
        option2.inject(undefined, '', [{
            selector: '.option',
            eventType: 'click',
            handler: ()=>{
                option1.getDOM()?.classList.remove("option-checked");
                option2.getDOM()?.classList.add("option-checked");
            }
        }]);
        
        const date = new VDateInput();
        main.add(name);
        main.add(surname);
        
        main.down('options', `
                width: 100%;
                height: fit-content;
                flex-direction: row;
                gap: 10px;
            `+CSS_center);
        main.add(option1);
        main.add(option2);
        main.up();
        main.add(date);

        super(main.getTemplate());
        this.vdom = main.getVDOM();
        this.setID();
    }
}