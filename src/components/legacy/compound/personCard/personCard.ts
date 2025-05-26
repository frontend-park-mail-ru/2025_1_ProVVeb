import BaseComponent from '@basecomp';
import Notification from '@notification';
import api from '@network';
import templateHBS from './personCard.hbs';

interface PersonCardParams {
	personId: number;
	srcPersonPictureError: string;
	srcPersonPhotos: string[];
	personName: string;
	personAge: number | '≥ 18';
	personDescription: string;
	isSinglePhoto: boolean;
	isPersonPremium: boolean;
	personBorderClass?: string
	isAccountPremium: boolean;
}

interface Callback {
	event: string;
	selector: string;
	callback: (event: Event) => void;
}

const DEFAULT_PARAMS_PERSON_CARD: PersonCardParams = {
	personId: 0,
	srcPersonPictureError: 'media/error/400x600.jpg',
	srcPersonPhotos: [],
	personName: 'Имя',
	personAge: 16,
	personDescription: 'Краткое описание человека...',
	isSinglePhoto: true,
	isPersonPremium: false,
	personBorderClass: '',
	isAccountPremium: false,
};

export default class PersonCard extends BaseComponent {
	private callbacks: Callback[];
	private personId: number;

	constructor(parentElement: HTMLElement, paramsHBS: Partial<PersonCardParams> = {}, callbacks: Callback[] = []) {
		const finalParamsHBS = { ...DEFAULT_PARAMS_PERSON_CARD, ...paramsHBS };
		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);

		this.callbacks = callbacks;
		this.personId = finalParamsHBS.personId;
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
			if (e.key === 'ArrowLeft') {
				document.querySelector('.personCard__arrow--left')?.click();
			} else if (e.key === 'ArrowRight') {
				document.querySelector('.personCard__arrow--right')?.click();
			}
		});

		const reportBtn = personCard.querySelector('.personCard__reportButton');
		const reportModal = document.getElementById('reportModal');
		const cancelBtn = reportModal?.querySelector('.report-modal__cancel');
		const submitBtn = reportModal?.querySelector('.report-modal__submit');
		const select = reportModal?.querySelector('.report-modal__select');
		const textarea = reportModal?.querySelector('.report-modal__textarea');

		const resetModalFields = () => {
			if (select) {
				select.value = 'Неприемлемый контент';
			}

			if (textarea) {
				textarea.value = '';
			}
		};

		const closeModal = () => {
			reportModal?.classList.remove('report-modal--visible');
		};

		const closeAndResetModal = () => {
			closeModal();
			resetModalFields();
		};

		cancelBtn?.addEventListener('click', closeAndResetModal);

		reportBtn.addEventListener('click', () => {
			resetModalFields();
			reportModal?.classList.add('report-modal--visible');
			setTimeout(() => { textarea?.focus(); }, 100);
		});

		submitBtn?.addEventListener('click', async () => {
			const response = await api.sendComplaint(
				select?.value,
				textarea?.value,
				String(this.personId),
			);

			if (response.success && response.data) {
				const notification = new Notification({
					headTitle: 'Успешно',
					title: 'Ваше обращение отправлено',
					isWarning: false,
					isWithButton: true,
				});
				notification.render();

				closeModal();
			} else {
				const notification = new Notification({
					headTitle: 'Ошибка отправки',
					title: 'Не удалось отправить обращение. Попробуйте позже',
					isWarning: false,
					isWithButton: true,
				});
				notification.render();
			}
		});

		reportModal?.addEventListener('click', (e) => {
			if (e.target === reportModal) {
				closeAndResetModal();
			}
		});

		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && reportModal?.classList.contains('report-modal--visible')) {
				closeAndResetModal();
			}
		});

	}
}
