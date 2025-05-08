import BaseComponent from '@basecomp';
import store from '@store';
import templateHBS from './notification.hbs';

interface NotificationParams {
	headTitle?: string;
	title: string;
	isWarning: boolean;
	isWithButton: boolean;
}

export default class Notification extends BaseComponent {
    constructor(paramsHBS: NotificationParams) {
        const templateHTML = templateHBS(paramsHBS);
        super(templateHTML, store.getState('notif_layer') as HTMLElement);

        this.addListener(
            'click',
            '.notification__cross',
            (event: Event) => {
                const target = event.target as HTMLElement;
                target.parentElement?.parentElement?.remove();
            }
        );
    }

    render(): void {
        this.parentElement.innerHTML = this.template;
        this.attachListeners();
    }
}
