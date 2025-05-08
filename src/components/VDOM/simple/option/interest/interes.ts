import { VBC } from "@modules/VDOM/VBC";
import templateHBS from './interes.hbs';

const DEFAULT_OPTION_PARAMS = {
    title: 'Интерес',
};

export class VInteres extends VBC{
    public isChecked: boolean;

    constructor(title: string){
        super(
            templateHBS,
            DEFAULT_OPTION_PARAMS,
            '',
            [],
            {title: title}
        );
        this.isChecked = false;
        this.inject(undefined, '', [{
            selector: '.interes',
            eventType: 'click',
            handler: (event)=>{
                let target = event.target as HTMLElement;
                if(target.className == "interes__text")
                    target = target.parentElement as HTMLElement;
                if(!this.isChecked){
                    target.classList.add('interes-checked');
                    this.isChecked = true;
                }else{
                    target.classList.remove('interes-checked');
                    this.isChecked = false;
                }
            }
        }]);
    }

    public setChecked(): void{
        this.getDOM()?.click();
    }
}