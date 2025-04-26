import { VBC } from "@modules/VDOM/VBC";
import templateHBS from './button.hbs';

const DEFAULT_VBUTTON_PARAMS = {
    lable: "КНОПКА",
    onClick: ()=>{},
}

export class VButton extends VBC {
    constructor(lable: string, onClick: ()=>void){
        super(
            templateHBS, 
            DEFAULT_VBUTTON_PARAMS, 
            ``,
            [{ 
                selector: '.btn', 
                eventType: 'click',
                handler: onClick 
            }],
            {lable: lable, onClick: onClick}
        );
    }
}
