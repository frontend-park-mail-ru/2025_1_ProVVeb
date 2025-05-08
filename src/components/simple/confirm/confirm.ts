import BaseComponent from '@basecomp';
import store from '@store';
import templateHBS from './confirm.hbs';

interface ConfirmParams {
	headTitle: string;
	title: string;
	isWarning: boolean;
}

export default class Confirm extends BaseComponent {
    private choice: ((ans: boolean) => void) | null = null;

    constructor(paramsHBS: ConfirmParams) {
        const templateHTML = templateHBS(paramsHBS);
        const notif = store.getState('notif_layer') as HTMLElement;
        notif.classList.add('blocked');
        super(templateHTML, notif);

        this.addListener(
            'click',
            '.confirm__buttons_positive',
            () => {
                this.choice?.(true);
                document.getElementById('notif_layer')?.classList.remove('blocked');

                const confirm = this.parentElement.children[0];
                confirm.classList.add('confirm__animation');
            }
        );
        this.addListener(
            'click',
            '.confirm__buttons_negative',
            () => {
                this.choice?.(false);
                document.getElementById('notif_layer')?.classList.remove('blocked');

                const confirm = this.parentElement.children[0];
                confirm.classList.add('confirm__animation');
            }
        );
    }

    async render(): Promise<boolean> {
        this.parentElement.innerHTML = this.template;
        this.attachListeners();

        return new Promise((resolve) => {
            this.choice = resolve;
        });
    }

}
