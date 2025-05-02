import { VBC } from '@modules/VDOM/VBC';
import templateHBS from './interesInput.hbs';
import { Compounder } from '@modules/VDOM/Compounder';

export class VIntreresInput extends VBC {
    constructor(props: {text: string} = {text: ""}){
        super(
            templateHBS,
            {}, '', [],
            props
        );
    }
}

export class VInteresInputFull extends VBC{
    public isChecked: boolean = true;
    private isFinished: boolean = false;
    public text: string = '';

    constructor(){
        const input = new VBC(
            `<input type="text" class="date-input__hidden-input" maxlength="15" placeholder="">`
        );
        const inner = new VIntreresInput();

        const compounder = new Compounder();
        compounder.down('.interesInput', `position: relative;`);
        compounder.add(input);
        compounder.add(inner);

        super(
            compounder.getTemplate(),
            {}, '',
            [
                {
                    selector: '.date-input__hidden-input',
                    eventType: 'input',
                    handler: (e: Event)=>{
                        const event = e as InputEvent;
                        const target = event.target as HTMLInputElement;
                        if(target){
                            this.text = target.value;
                            inner.injectProps({text: target.value+'|'});
                            inner.inject(undefined, '', this.eventsList);
                            inner.update();
                        }
                    }
                },
                {
                    selector: '.btns__saveBtn',
                    eventType: 'click',
                    handler: ()=>{
                        (input.getDOM() as HTMLInputElement).disabled = true;
                        inner.injectProps({text: this.text});
                        inner.inject(undefined, `
                            .interesInput__btns {
                                display: none;
                            }
                            .interesInner {
                                cursor: pointer;
                            }
                        `, this.eventsList);

                        input.inject(undefined, '.date-input__hidden-input { display: none; } ')
                        input.update();

                        inner.update();
                        this.isFinished = true;
                    }
                },
                {
                    selector: '.btns__cancelBtn',
                    eventType: 'click',
                    handler: ()=>{ this.delete(); }
                },
                {
                    selector: '.interesInner',
                    eventType: 'click',
                    handler: (e: Event)=>{
                        const tag = (e.target as HTMLElement).tagName;
                        if(!this.isFinished || tag == 'IMG' || tag == 'BUTTON')
                            return;

                        if(this.isChecked)
                            inner.getDOM()?.classList.add('interesInner-grey');
                        else
                            inner.getDOM()?.classList.remove('interesInner-grey');
                
                        this.isChecked = !this.isChecked;
                    }
                }
            ]
        );
    }
}