import { VBC } from '@modules/VDOM/VBC';
import templateHBS from './chatMobileToggle.hbs';

export class VChatMobileToggle extends VBC {
    constructor() {
        super(
            templateHBS,
            {},
            '',
            [
                {
                    selector: '.chatMobileToggle__input',
                    eventType: 'click',
                    handler: () => {
                        console.log('Send button clicked');
                        const toggleInput = document.querySelector('.chatMobileToggle__input');
                        const usersList = document.querySelector('.usersList');

                        usersList.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        toggleInput.addEventListener('change', function () {
                            if (this.checked) {
                                usersList.style.opacity = '0';
                                usersList.style.transform = 'translateX(20px)';
                                setTimeout(() => {
                                    usersList.style.display = 'none';
                                }, 300);
                            } else {
                                usersList.style.display = 'flex';
                                setTimeout(() => {
                                    usersList.style.opacity = '1';
                                    usersList.style.transform = 'translateX(0)';
                                }, 10);
                            }
                        });
                    }
                },
            ],
            {},
        );
    }
}
