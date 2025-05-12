import BaseComponent from '@basecomp';
import store from '@store';
import router, { AppPage } from '@modules/router';
import templateHBS from './profile.hbs';

interface ProfileParams {
	profileName: string;
	photoSrc: string;
}

const DEFAULT_PARAMS_PROFILE: ProfileParams = {
	profileName: 'Имя человека',
	photoSrc: 'media/logo/logoMain.svg',
};

export default class Profile extends BaseComponent {
	constructor(parentElement: HTMLElement, paramsHBS: Partial<ProfileParams> = {}) {
		const finalParamsHBS = { ...DEFAULT_PARAMS_PROFILE, ...paramsHBS };

		store.subscribe('profileName', (newName: unknown) => {
			const profileElement = parentElement.querySelector('.profile');
			if (profileElement) {
				const nameElement = profileElement.children[0] as HTMLElement;
				if (nameElement) {
					nameElement.innerHTML = newName as string;
				}
			}
		});
		store.subscribe('ava', (newAva: unknown) => {
			const profileElement = parentElement.querySelector('.profile');
			if (profileElement) {
				const avaElement = profileElement.children[1] as HTMLElement;
				const imgElement = avaElement.querySelector('img');
				if (imgElement) { imgElement.src = newAva as string; }
			}
		});

		const templateHTML = templateHBS(finalParamsHBS);
		super(templateHTML, parentElement);

		this.addListener(
			'click',
			'.profile',
			() => {
				router.navigateTo(AppPage.Settings);
			}
		);
	}
}
