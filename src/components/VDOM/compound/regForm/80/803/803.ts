import { Compounder } from "@modules/VDOM/Compounder";
import { VBC } from "@modules/VDOM/VBC";
import { VComplaintBody } from "@VDOM/simple/complaint/body/body";

export class CReg80_3 extends VBC {
    constructor(){
        const main = new Compounder();
        const comp = new VComplaintBody("", "Напиши немного о себе:");
        comp.inject(undefined, `
            .complaintBody__input {
                height: 250px;
            }    
        `);
        main.add(comp);

        super(main.getTemplate());
        this.vdom = main.getVDOM();
        this.setID();
    }
}