import { VBC } from "@modules/VDOM/VBC";
import templateHBS from './button.hbs';

export class VButton extends VBC {
    constructor(lable: string, onClick: ()=>void){
        super(
            templateHBS, 
            {
                lable: "КНОПКА",
                onClick: ()=>{},
            }, 
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
