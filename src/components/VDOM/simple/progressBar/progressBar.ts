import { VBC } from '@modules/VDOM/VBC';
import templateHBS from './progressBar.hbs';

export class VProgressBar extends VBC {
    constructor(percent: string = '0') {
        super(
            templateHBS,
            {},
            `.progressBar__line{
                width: ${percent}%;
            }`
        );
    }
}
