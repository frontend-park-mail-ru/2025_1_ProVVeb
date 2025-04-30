import { Compounder } from "@modules/VDOM/Compounder";
import { VBC } from "@modules/VDOM/VBC";
import { CSS_center } from "@VDOM/defaultStyles/VStyles";
import { VBackButton } from "@VDOM/simple/button/backButton/backButton";
import { VButton } from "@VDOM/simple/button/button";
import { VDateInput } from "@VDOM/simple/input/dateInput/dateInput";
import { VInput } from "@VDOM/simple/input/input";
import { VOption } from "@VDOM/simple/option/option";
import { VProgressBar } from "@VDOM/simple/progressBar/progressBar";

export class CRegForm extends VBC {
    constructor(){
        const main = new Compounder();
        main.down('registrationForm', `
            padding: 40px;
            width: 450px;
            height: 500px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            border-radius: 12px;
            background: white;
        `);
        const progressBar = new VProgressBar();
        const title = new VBC(
            `<p class="titleCard">Давай познакомимся 😊</p>`, {}, `
                .titleCard {
                    font-weight: 500;
                    font-size: 30px;
                    line-height: 127%;
                    text-align: center;
                    color: #000;
                }
            `
        );
        
        main.down('registrationForm__inner', CSS_center+'width: 100%; height: 100%; flex-direction: column');
        main.add(progressBar);
        main.add(title);
        main.down('registrationForm__data', CSS_center+'width: 100%; height: 100%; flex-direction: column');
        
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
        }])

        option2.inject(undefined, '', [{
            selector: '.option',
            eventType: 'click',
            handler: ()=>{
                option1.getDOM()?.classList.remove("option-checked");
                option2.getDOM()?.classList.add("option-checked");
            }
        }])

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

        const backBtn = new VBackButton(()=>{});
        const continueBtn = new VButton("Продолжить", ()=>{});

        main.down('buttons', `
                width: 100%;
                height: fit-content;
                flex-direction: row;
                gap: 10px;
            `+CSS_center);
        main.add(backBtn);
        main.add(continueBtn);

        super(main.getTemplate());
    }
}