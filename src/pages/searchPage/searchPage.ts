import { Compounder } from '@VDOM/Compounder';
import HeaderMain from '@compound/headerMain/headerMain';
import NavMenu from '@compound/navMenu/navMenu';
import { VSearchInput } from '@ui/search/searchInput/searchInput';
import { VSearchItem } from '@ui/search/searchItem/searchItem';
import { VSearchStart } from '@ui/search/searchStart/searchStart';
import api from '@network';
import Notification from '@notification';
import store from '@store';
import BasePage from '../BasePage';

enum Gender {
	Male = 'Male',
	Any = 'Any',
	Female = 'Female'
}

interface SearchProfile {
	input: string;
	isMale: Gender;
	ageMin: number;
	ageMax: number;
	heightMin: number;
	heightMax: number;
	country: string;
	city: string;
}

interface FoundProfile {
	idUser: number;
	firstImgSrc: string;
	fullname: string;
	age: number;
}

export default class SearchPage extends BasePage {
	private components: Array<HeaderMain | NavMenu>;

	private contentWrapper: HTMLElement;

	private pageCompounder: Compounder = new Compounder();

	constructor(parentElement: HTMLElement) {
		super(parentElement);

		this.contentWrapper = document.createElement('div');
		this.contentWrapper.className = 'mainContent';

		this.components = [
			new HeaderMain(parentElement),
			new NavMenu(this.contentWrapper),
		];
	}

	async render(): Promise<void> {
		this.pageCompounder.clear();
		this.pageCompounder.down('contentWrapper__inner');

		const searchInput = new VSearchInput(async () => {
			const input = document.querySelector('.searchInput__input') as HTMLInputElement;
			const selectedGender = document.querySelector('input[name="gender"]:checked') as HTMLInputElement;
			const ageMin = document.getElementById('ageMin') as HTMLInputElement;
			const ageMax = document.getElementById('ageMax') as HTMLInputElement;
			const heightMin = document.getElementById('heightMin') as HTMLInputElement;
			const heightMax = document.getElementById('heightMax') as HTMLInputElement;
			const country = document.getElementById('country') as HTMLInputElement;
			const city = document.getElementById('city') as HTMLInputElement;

			const { success, data: searchItems } = await this.getItemsBySearch({
				input: input.value.trim(),
				isMale: Object.values(Gender).includes(selectedGender.value as Gender)
					? selectedGender.value as Gender : Gender.Any,
				ageMin: !Number.isNaN(Number(ageMin.value)) ? Number(ageMin.value) : 18,
				ageMax: !Number.isNaN(Number(ageMax.value)) ? Number(ageMax.value) : 125,
				heightMin: !Number.isNaN(Number(heightMin.value)) ? Number(heightMin.value) : 100,
				heightMax: !Number.isNaN(Number(heightMax.value)) ? Number(heightMax.value) : 250,
				country: '', // country.value.trim(),
				city: '', // city.value.trim(),

			});

			if (!success) {
				const notification = new Notification({
					headTitle: 'Ошибка сети',
					title: 'Не удалось отправить ваш запрос поиска. Попробуйте позже',
					isWarning: false,
					isWithButton: true,
				});
				notification.render();
				return;
			}

			this.pageCompounder.clear();
			this.pageCompounder.down('contentWrapper__inner');
			this.pageCompounder.add(searchInput);

			this.pageCompounder.down('searchItems', `
				margin-top: 20px;
				display: flex; 
				gap: 10px; 
				flex-wrap: wrap;
				justify-content: space-between;
				max-height: 635px;
				width: 100%;
				overflow: auto;
				scrollbar-width: none;
			`);

			if (searchItems.length === 0) {
				this.pageCompounder.add(new VSearchStart(
					'Не удалось найти (',
					'Попробуй изменить параметры поиска'
				));
			} else {
				searchItems.forEach((item) => this.pageCompounder.add(item));
			}

			this.pageCompounder.render(this.contentWrapper);
		}, () => {
			this.pageCompounder.clear();
			this.pageCompounder.down('contentWrapper__inner');
			this.pageCompounder.add(searchInput);

			this.pageCompounder.down('searchItems', `
				margin-top: 20px;
				display: flex; 
				gap: 10px;
				flex-wrap: wrap;
				justify-content: space-between;
				height: 635px;
				width: 100%;
				overflow: auto;
				scrollbar-width: none;
			`);

			this.pageCompounder.add(new VSearchStart());
			this.pageCompounder.render(this.contentWrapper);
		});

		this.pageCompounder.add(searchInput);

		this.pageCompounder.down('searchItems', `
			margin-top: 20px;
			display: flex; 
			gap: 10px;
			flex-wrap: wrap;
			justify-content: space-between;
			height: 635px;
			width: 100%;
			overflow: auto;
			scrollbar-width: none;
		`);

		this.pageCompounder.add(new VSearchStart());

		this.contentWrapper.innerHTML = '';
		this.components[0].render();
		this.parentElement.appendChild(this.contentWrapper);
		this.components[1].render();

		this.pageCompounder.addTo(this.contentWrapper);
	}

	public getNavMenu(): NavMenu {
		return this.components[1] as NavMenu;
	}

	async getItemsBySearch(params: SearchProfile): Promise<{ success: boolean, data: Array<VSearchItem> }> {
		const response = await this.getProfilesBySearch(params);

		if (!response.success) {
			return { success: false, data: [] };
		}
		console.log('response.data', response.data)
		return {
			success: true,
			data: response.data.slice(0, 10).map((profile) => new VSearchItem(
				api.BASE_URL_PHOTO + profile.firstImgSrc,
				profile.fullname,
				profile.age
			))
		};
	}

	async getProfilesBySearch(params: SearchProfile): Promise<{ success: boolean, data: Array<FoundProfile> }> {
		const response = await api.profilesBySearch(
			params.input,
			params.isMale,
			params.ageMin,
			params.ageMax,
			params.heightMin,
			params.heightMax,
			params.country,
			params.city,
		);

		if (!response.success) {
			const notification = new Notification({
				headTitle: 'Ошибка сети',
				title: 'Не удалось отправить ваши пожелания. Попробуйте позже',
				isWarning: false,
				isWithButton: true,
			});
			notification.render();
			return { success: false, data: [] };
		}

		if (response.data?.message !== undefined) {
			return { success: true, data: [] };
		}

		return {
			success: true,
			data: response.data.profiles.map((profile: any) => ({
				idUser: profile.idUser || store.getState('myID') as number,
				firstImgSrc: profile.firstImgSrc || '/frontend/src/media/error/400x600.jpg',
				fullname: profile.fullname || 'Мое имя, хи-хи',
				age: profile.age || 16,
			}))
		};
	}
}
