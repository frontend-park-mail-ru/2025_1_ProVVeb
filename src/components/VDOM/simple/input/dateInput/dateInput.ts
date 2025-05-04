import { VBC } from "@modules/VDOM/VBC";
import templateHBS from "./dateInput.hbs";
import { Compounder } from "@modules/VDOM/Compounder";
import { CSS_center } from "src/components/VDOM/defaultStyles/VStyles";

type CharType = "digit" | "slash";

interface CharData {
    value: string;
    isDigit: boolean;
}

function formatToDisplay(value: string): CharData[] {
    return [
        { value: value[0] || "D", isDigit: true },
        { value: value[1] || "D", isDigit: true },
        { value: "/", isDigit: false },
        { value: value[2] || "M", isDigit: true },
        { value: value[3] || "M", isDigit: true },
        { value: "/", isDigit: false },
        { value: value[4] || "Y", isDigit: true },
        { value: value[5] || "Y", isDigit: true },
        { value: value[6] || "Y", isDigit: true },
        { value: value[7] || "Y", isDigit: true },
    ];
}

export class VDateInput extends VBC {
    private ui: VDateInputUI;

    constructor() {
        super(
            `<div><input type="text" class="date-input__hidden-input" maxlength="8" placeholder="DDMMYYYY">
            <div class="date-input__disclaimer">Возраст будет публичен</div></div>`,
            {},
            '',
            [{
                selector: '.date-input__hidden-input',
                eventType: 'input',
                handler: (e)=>{
                    const input = e.target as HTMLInputElement;
                    const rawValue = input.value.replace(/\D/g, '').slice(0, 8); //не просто заменять, а вообще не давать
                    input.value = rawValue;
                    ui.injectProps({ chars: formatToDisplay(rawValue) });
                    ui.update();
                }
            }]
        );

        const compounder = new Compounder();
        const ui = new VDateInputUI();
        compounder.down('.date-input-box', `position: relative;`);
        compounder.add(ui);
        compounder.add(this);

        this.inject(compounder.getTemplate());
        this.ui = ui;
    }

    public setDate(text: string): void {
        const element = this.getDOM()?.querySelector("input") as HTMLInputElement;
        element.value = text;
        this.ui.injectProps({ chars: formatToDisplay(text) });
        this.ui.forceUpdate();
        this.ui.update();
    }

    public getDate(): string {
        const element = this.getDOM()?.querySelector("input") as HTMLInputElement;
        return element.value;
    }
}

export class VDateInputUI extends VBC {
    constructor(initialValue: string = "") {
        super(
            templateHBS,
            { chars: formatToDisplay(initialValue) },
            '',
            []
        );
    }
}
