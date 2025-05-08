import BaseComponent from '@basecomp';
import templateHBS from './personCard.hbs';

interface PersonCardParams {
	srcPersonPictureError: string;
	srcPersonPhotos: string[];
	personName: string;
	personAge: number | '≥ 18';
	personDescription: string;
}

interface Callback {
	event: string;
	selector: string;
	callback: (event: Event) => void;
}

const DEFAULT_PARAMS_PERSON_CARD: PersonCardParams = {
    srcPersonPictureError: 'media/error/400x600.jpg',
    srcPersonPhotos: [],
    personName: 'Имя',
    personAge: 16,
    personDescription: 'Краткое описание человека...',
};

export default class PersonCard extends BaseComponent {
    private callbacks: Callback[];

    constructor(parentElement: HTMLElement, paramsHBS: Partial<PersonCardParams> = {}, callbacks: Callback[] = []) {
        const finalParamsHBS = { ...DEFAULT_PARAMS_PERSON_CARD, ...paramsHBS };
        const templateHTML = templateHBS(finalParamsHBS);
        super(templateHTML, parentElement);

        this.callbacks = callbacks;
    }

    render(): void {
        super.render();
        this.callbacks.forEach((callback) => {
            this.addListener(callback.event, callback.selector, callback.callback);
        });
        this.attachListeners();

        const personCard = document.getElementById('idPersonCard');
        if (!personCard) { return; }

        const radioInputs = personCard.querySelectorAll('.personCard__radio');
        const arrowLeft = personCard.querySelector('.personCard__arrow--left');
        const arrowRight = personCard.querySelector('.personCard__arrow--right');

        if (!radioInputs.length || !arrowLeft || !arrowRight) { return; }

        arrowLeft.addEventListener('click', () => {
            const currentIndex = getCurrentPhotoIndex();
            const prevIndex = currentIndex - 1 < 0 ? radioInputs.length - 1 : currentIndex - 1;
            radioInputs[prevIndex].checked = true;
        });

        arrowRight.addEventListener('click', () => {
            const currentIndex = getCurrentPhotoIndex();
            const nextIndex = currentIndex + 1 >= radioInputs.length ? 0 : currentIndex + 1;
            radioInputs[nextIndex].checked = true;
        });

        function getCurrentPhotoIndex() {
            for (let i = 0; i < radioInputs.length; i++) {
                if (radioInputs[i].checked) { return i; }
            }

            return 0;
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') { document.querySelector('.personCard__arrow--left')?.click(); } else if (e.key === 'ArrowRight') { document.querySelector('.personCard__arrow--right')?.click(); }
        });

    }
}
