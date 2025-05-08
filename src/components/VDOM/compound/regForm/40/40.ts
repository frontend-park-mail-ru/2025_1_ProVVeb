import { Compounder } from "@modules/VDOM/Compounder";
import { VBC } from "@modules/VDOM/VBC";
import store from "@store";
import { VInput } from "@VDOM/simple/input/input";
import { VList, COUNTRIES } from "@VDOM/simple/list/list";
import Notification from "@simple/notification/notification";
import { 
    isValidLocation, 
    isValidEmail, 
    isValidPhone
  } from '@validation';

export class CReg40 extends VBC {
    private country: VInput;
    private city: VInput;
    private district: VInput;
    private mail: VInput;
    private list: VList;
    private phone: VInput;

    constructor(){
        const country = new VInput("Страна");
        const city = new VInput("Город");
        const district = new VInput("Район");
        const mail = new VInput("Почтовый адрес");

        const list = new VList();
        const phone = new VInput("(012) 345-67-89");

        const main = new Compounder();
        main.down("location", `
            width: 100%;
            height: fit-content;
            display: flex;
            flex-direction: row;
            align-items: space-between;
        `);
        main.add(country);
        main.add(city);
        main.add(district);
        main.up();
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

        this.country = country;
        this.city = city;
        this.district = district;
        this.mail = mail;
        this.list = list;
        this.phone = phone;
    }

    public updateTemplate(): void {
        const user = store.getState("myUser") as any;
        const profile = store.getState("myProfile") as any;

        const location = profile.location.split('@');
        this.country.setValue(location[0]);
        if(location[1])this.city.setValue(location[1]);
        if(location[2])this.district.setValue(location[2]);
        this.mail.setValue(user.email);
        
        let code = user.phone.split('(')[0];
        if(!code)code = "RU +7";
        this.list.injectProps({countryCode: code, listVisible: false, countries: COUNTRIES});

        let phone = '('+user.phone.split('(')[1];
        if(phone == '(undefined')phone = '';
        this.phone.setValue(phone);
    }

    public submit(): boolean {
        const user = store.getState("myUser") as any;
        const profile = store.getState("myProfile") as any;
        
        const country = this.country.getValue();
        const city = this.city.getValue();
        const district = this.district.getValue();
        
        if (!isValidLocation(country) || !isValidLocation(city) || !isValidLocation(district)) {
            new Notification({
                headTitle: "Ошибка валидации",
                title: 'Каждое поле (страна/город/район) должно быть 3-15 символов',
                isWarning: true,
                isWithButton: true,
            }).render();
            return false;
        }
        profile.location = `${country}@${city}@${district}`;
    
        const email = this.mail.getValue();
        if (!isValidEmail(email)) {
            new Notification({
                headTitle: "Ошибка валидации",
                title: 'Введите корректный email (например: example@mail.com)',
                isWarning: true,
                isWithButton: true,
            }).render();
            return false;
        }
    
        const phonePrefix = this.list.getDOM()?.textContent?.split(' ')[1] || '';
        const phoneNumber = this.phone.getValue();
        const fullPhone = phonePrefix + phoneNumber;
        
        if (!isValidPhone(phoneNumber)) {
            new Notification({
                headTitle: "Ошибка валидации",
                title: 'Телефон должен быть в формате (123)4567890',
                isWarning: true,
                isWithButton: true,
            }).render();
            return false;
        }
    
        user.email = email;
        user.phone = fullPhone;
    
        store.setState("myProfile", profile);
        store.setState("myUser", user);
        return true;
    }
}