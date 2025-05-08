import { VBC } from '@modules/VDOM/VBC';
import templateHBS from './list.hbs';

export interface Country {
    name: string;
    code: string;
}

export interface CountryDropdownProps {
    countryCode: string;
    listVisible: boolean;
    countries: Country[];
}

export const COUNTRIES: Country[] = [
    { name: 'Russia', code: 'RU +7' },
    { name: 'Belarus', code: 'BY +375' },
    { name: 'Kazakhstan', code: 'KZ +7' },
    { name: 'Armenia', code: 'AM +374' },
    { name: 'Azerbaijan', code: 'AZ +994' },
    { name: 'Kyrgyzstan', code: 'KG +996' },
    { name: 'Moldova', code: 'MD +373' },
    { name: 'Tajikistan', code: 'TJ +992' },
    { name: 'Uzbekistan', code: 'UZ +998' }
]; 

export class VList extends VBC<CountryDropdownProps> {
    private clickOutsideHandler?: (e: MouseEvent) => void;

    constructor(props?: CountryDropdownProps) {
        super(
            templateHBS,
            {
                countryCode: 'RU +7',
                listVisible: false,
                countries: COUNTRIES,
            } as CountryDropdownProps,
            '',
            [
                {
                    selector: ".country-dropdown__selected",
                    eventType: "click",
                    handler: () => this.toggleList(true)
                },
                {
                    selector: ".country-dropdown__option",
                    eventType: "click",
                    handler: (e: Event) => this.handleOptionClick(e)
                }
            ],
            props
        );
    }

    private toggleList(visible?: boolean) {
        const newProps = {
            ...this.props,
            listVisible: visible ?? !this.props.listVisible
        };

        if(this.clickOutsideHandler)
            this.removeClickOutsideListener();
        else
            this.addClickOutsideListener();

        // this.inject(undefined, ".underline { background-color: #010710; }");
        // this.update();
        this.injectProps(newProps);
        this.update();
        // this.inject(undefined, ".underline { background-color: #010710; }");
        // console.log(this.vdom)
        // this.update();
    }

    private handleOptionClick(e: Event) {
        const target = e.currentTarget as HTMLElement;
        const code = target.dataset.code;

        if (code) {
            const newProps = {
                ...this.props,
                countryCode: code,
                listVisible: false
            };
            
            // this.inject(undefined, ".underline { background-color: var(--gray-line); }");
            // this.update();
            this.injectProps(newProps);
            this.update();
        }
    }

    private addClickOutsideListener() {
        this.clickOutsideHandler = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!this.getDOM()?.outerHTML.includes(target.innerHTML)) {
                this.toggleList(false);
            }
        };
        
        document.addEventListener('click', this.clickOutsideHandler);
    }

    private removeClickOutsideListener() {
        if (this.clickOutsideHandler) {
            document.removeEventListener('click', this.clickOutsideHandler);
            this.clickOutsideHandler = undefined;
        }
    }
}