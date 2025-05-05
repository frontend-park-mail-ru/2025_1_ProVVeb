import { Compounder } from "@modules/VDOM/Compounder";
import { VBC } from "@modules/VDOM/VBC";
import { VInput } from "@VDOM/simple/input/input";
import { VOption } from "@VDOM/simple/option/option";
import { VDateInput } from "@VDOM/simple/input/dateInput/dateInput";
import { CSS_center } from "@VDOM/defaultStyles/VStyles";
import store from "@store";
import api from '@network';

export class CReg20 extends VBC {
    private name: VInput;
    private surname: VInput;
    private option1: VOption;
    private option2: VOption;
    private date: VDateInput;

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
                option1.isChecked = true;
                option1.isChecked = false;
            }
        }]);
        option2.inject(undefined, '', [{
            selector: '.option',
            eventType: 'click',
            handler: ()=>{
                option1.getDOM()?.classList.remove("option-checked");
                option2.getDOM()?.classList.add("option-checked");
                option1.isChecked = false;
                option1.isChecked = true;
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

        this.name = name;
        this.surname = surname;
        this.option1 = option1;
        this.option2 = option2;
        this.date = date;
    }

    public updateTemplate(): void {
        const profile = store.getState("myProfile") as any;
        this.name.setValue(profile.firstName);
        this.surname.setValue(profile.lastName);
        if(profile.isMale)
            this.option1.setChecked();
        else
            this.option2.setChecked();
        let date = profile.birthday.split('-').reverse();
        date[0] = date[0].slice(0, 2);
        date = date.join('');
        this.date.setDate(date);
    }

    public async submit(){
        const profile = store.getState("myProfile") as any;
        profile.firstName = this.name.getValue();
        profile.lastName = this.surname.getValue();
        const isChecked = this.option1.getDOM()?.classList.length == 2 ? true : false;

        store.setState("isMale", profile.isMale);
        profile.isMale = isChecked;

        profile.birthday = this.formatDateFromDDMMYYYY(this.date.getDate());

        store.setState("myProfile", profile);
    }

    private formatDateFromDDMMYYYY(ddmmyyyy: string) {
        if(ddmmyyyy == '')return '';
        const day = ddmmyyyy.substring(0, 2);
        const month = ddmmyyyy.substring(2, 4);
        const year = ddmmyyyy.substring(4, 8);
    
        const isoDate = `${year}-${month}-${day}T00:00:00Z`;
        return isoDate;
    }
}