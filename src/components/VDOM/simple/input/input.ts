import { VBC } from '@modules/VDOM/VBC';
import Input from '@pattern/input/input';

export class VInput extends VBC {
    constructor(placehoolder: string, onFocus: ()=>void = () => {}, onBlur: ()=>void = () => {}) {
        const input = new Input(document.createElement('div'), {
            typeInput: 'text',
            idInput: 'input_id',
            nameInput: 'input_name',
            labelText: placehoolder,
            autocompleteInput: 'on',
            listeners: [],
            isPassword: false
        });
        const { template } = input;

        super(
            template,
            {},
            '',
            [
                {
                    selector: '',
                    eventType: '',
                    handler: onFocus,
                },
                {
                    selector: '',
                    eventType: '',
                    handler: onBlur,
                }
            ],
            {}
        );
    }

    public setValue(text: string) {
        const element = this.getDOM()?.querySelector('input') as HTMLInputElement;
        element.value = text;
    }

    public getValue(): string {
        const element = this.getDOM()?.querySelector('input') as HTMLInputElement;
        return element.value;
    }
}
