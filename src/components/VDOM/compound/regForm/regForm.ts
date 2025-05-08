import { Compounder } from '@modules/VDOM/Compounder';
import { VBC } from '@modules/VDOM/VBC';
import { CSS_center } from '@VDOM/defaultStyles/VStyles';
import { VBackButton } from '@VDOM/simple/button/backButton/backButton';
import { VButton } from '@VDOM/simple/button/button';
import { VProgressBar } from '@VDOM/simple/progressBar/progressBar';

export class CRegForm extends VBC {
    private main: Compounder = new Compounder();

    constructor(width: number, progress: number, formTitle: string, comp: VBC) {
        const main = new Compounder();
        main.down('registrationForm', `
            padding: 40px;
            max-width: ${width}px;
            height: 500px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            border-radius: 12px;
            background: white;
            margin-top: 100px;
            margin-left: auto;
            margin-right: auto;
        `);
        const progressBar = new VProgressBar(progress.toString());
        const title = new VBC(
            `<p class="titleCard">${formTitle}</p>`, {}, `
                .titleCard {
                    font-weight: 500;
                    font-size: 30px;
                    line-height: 127%;
                    text-align: center;
                    color: #000;
                }
            `
        );

        main.down('registrationForm__inner', `${CSS_center}
            width: 100%;
            height: 100%;
            flex-direction: column
        `);
        main.add(progressBar);
        main.add(title);
        main.down('registrationForm__data', `
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            padding: 20px 0px;
        `);

        main.add(comp);

        const backBtn = new VBackButton(() => {});
        const continueBtn = new VButton('Продолжить', () => {});
        const empty = new VBackButton(() => {});
        empty.inject(undefined, '.backButton { cursor: default; opacity: 0; }');

        main.up();
        main.down('buttons', `
                width: 100%;
                height: fit-content;
                flex-direction: row;
                gap: 10px;
            ${CSS_center}`);
        main.add(backBtn);
        main.add(continueBtn);
        main.add(empty);

        super(main.getTemplate());
        this.vdom = main.getVDOM();
        this.setID();

        this.main = main;
    }
}
