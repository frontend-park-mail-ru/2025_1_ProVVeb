import BasePage from '../BasePage';
import { Compounder } from '@modules/VDOM/Compounder';
import HeaderMain from '@compound/headerMain/headerMain';
import NavMenu from '@compound/navMenu/navMenu';
import { VSearchInput } from '@VDOM/simple/search/searchInput/searchInput';
import { VSearchItem } from '@VDOM/simple/search/searchItem/searchItem';
import { VSearchStart } from '@VDOM/simple/search/searchStart/searchStart';
import api from '@network';
import Notification from '@simple/notification/notification';

export default class SearchPage extends BasePage {
	private components: Array<HeaderMain | NavMenu>;
	private contentWrapper: HTMLElement;
	private compounder: Compounder = new Compounder;

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
		this.compounder.clear();

		const searchInput = new VSearchInput(async () => {
			const ageMin = document.getElementById('ageMin') as HTMLInputElement;
			const ageMax = document.getElementById('ageMax') as HTMLInputElement;
			const heightMin = document.getElementById('heightMin') as HTMLInputElement;
			const heightMax = document.getElementById('heightMax') as HTMLInputElement;
			const input = document.querySelector('.searchInput__input') as HTMLInputElement;
			console.log('Age:', ageMin.value, ageMax.value, 'Height:', heightMin.value, heightMax.value, 'Input:', input.value.trim());

			const { success, data: searchItems } = await this.getItemsBySearch({
				input: input.value.trim(),
				ageMin: ageMin.value,
				ageMax: ageMax.value,
				heightMin: heightMin.value,
				heightMax: heightMax.value,
			});

			if (!success) {
				const notification = new Notification({
					headTitle: "Ошибка сети",
					title: `Не удалось отправить ваш запрос поиска. Попробуйте позже`,
					isWarning: false,
					isWithButton: true,
				});
				notification.render();
				return;
			}

			if (searchItems.length === 0) {
				this.compounder.add(new VSearchStart(
					'По вашему запросу ничего не найдено',
					'Попробуйте изменить параметры поиска'
				));
				return;
			}

			searchItems.forEach((item) => this.compounder.add(item));
		});

		this.compounder.add(searchInput);

		this.compounder.down('searchItems', `
			margin-top: 20px;
			display: flex; 
			gap: 10px; 
			flex-wrap: wrap;
			justify-content: space-between;
			height: 650px;
			width: 100%;
			overflow: auto;
			scrollbar-width: none;
		`);

		const searchStart = new VSearchStart();
		this.compounder.add(searchStart);
		this.contentWrapper.innerHTML = '';
		this.components[0].render();
		this.parentElement.appendChild(this.contentWrapper);
		this.components[1].render();

		this.compounder.addTo(this.contentWrapper);
	}

	public getNavMenu(): NavMenu {
		return this.components[1] as NavMenu;
	}

	async getItemsBySearch(params?: {
		input: string;
		ageMin: string;
		ageMax: string;
		heightMin: string;
		heightMax: string
	}) {
		const response = await this.getProfilesBySearch(params);

		if (!response.success) {
			return { success: false, data: [] };
		}
		return {
			success: true,
			data: response.data.map((profile) => new VSearchItem(
				profile.imgSrc,
				profile.name,
				profile.age
			))
		};
	}

	async getProfilesBySearch(params?: {
		input: string;
		ageMin: string;
		ageMax: string;
		heightMin: string;
		heightMax: string
	}) {
		// const response = await api.profilesBySearch(
		// 	params.input,
		// 	params.ageMin,
		// 	params.ageMax,
		// 	params.heightMin,
		// 	params.heightMax,
		// );

		// if (!(response.success && response.data)) {

		// 	const notification = new Notification({
		// 		headTitle: "Ошибка сети",
		// 		title: `Не удалось отправить ваши пожелания. Попробуйте позже`,
		// 		isWarning: false,
		// 		isWithButton: true,
		// 	});
		// 	notification.render();
		// 	return { success: false, data: [] };
		// }

		// return { success: true, data: response.data };

		return {
			success: true,
			data: [
				{
					imgSrc: 'https://avatars.mds.yandex.net/i?id=b820b49c4c850aafa15656d3f5fd60f5_l-5277098-images-thumbs&n=13',
					name: 'John Doe',
					age: 25,
				},
				{
					imgSrc: 'https://avatars.mds.yandex.net/i?id=b820b49c4c850aafa15656d3f5fd60f5_l-5277098-images-thumbs&n=13',
					name: 'John Doe',
					age: 25,
				},
				{
					imgSrc: 'https://avatars.mds.yandex.net/i?id=b820b49c4c850aafa15656d3f5fd60f5_l-5277098-images-thumbs&n=13',
					name: 'John Doe',
					age: 25,
				},
			],
		}

		// return [
		// 	{
		// 		imgSrc: 'https://avatars.mds.yandex.net/i?id=b820b49c4c850aafa15656d3f5fd60f5_l-5277098-images-thumbs&n=13',
		// 		name: 'John Doe',
		// 		age: 25,
		// 	},
		// 	{
		// 		imgSrc: 'https://avatars.mds.yandex.net/i?id=b820b49c4c850aafa15656d3f5fd60f5_l-5277098-images-thumbs&n=13',
		// 		name: 'John Doe',
		// 		age: 25,
		// 	},
		// 	{
		// 		imgSrc: 'https://avatars.mds.yandex.net/i?id=b820b49c4c850aafa15656d3f5fd60f5_l-5277098-images-thumbs&n=13',
		// 		name: 'John Doe',
		// 		age: 25,
		// 	},
		// 	{
		// 		imgSrc: 'https://avatars.mds.yandex.net/i?id=b820b49c4c850aafa15656d3f5fd60f5_l-5277098-images-thumbs&n=13',
		// 		name: 'John Doe',
		// 		age: 25,
		// 	},
		// 	{
		// 		imgSrc: 'https://avatars.mds.yandex.net/i?id=b820b49c4c850aafa15656d3f5fd60f5_l-5277098-images-thumbs&n=13',
		// 		name: 'John Doe',
		// 		age: 25,
		// 	},
		// 	{
		// 		imgSrc: 'https://avatars.mds.yandex.net/i?id=b820b49c4c850aafa15656d3f5fd60f5_l-5277098-images-thumbs&n=13',
		// 		name: 'John Doe',
		// 		age: 25,
		// 	},
		// 	{
		// 		imgSrc: 'https://avatars.mds.yandex.net/i?id=b820b49c4c850aafa15656d3f5fd60f5_l-5277098-images-thumbs&n=13',
		// 		name: 'John Doe',
		// 		age: 25,
		// 	},
		// 	{
		// 		imgSrc: 'https://avatars.mds.yandex.net/i?id=b820b49c4c850aafa15656d3f5fd60f5_l-5277098-images-thumbs&n=13',
		// 		name: 'John Doe',
		// 		age: 25,
		// 	},
		// 	{
		// 		imgSrc: 'https://avatars.mds.yandex.net/i?id=b820b49c4c850aafa15656d3f5fd60f5_l-5277098-images-thumbs&n=13',
		// 		name: 'John Doe',
		// 		age: 25,
		// 	},
		// 	{
		// 		imgSrc: 'https://avatars.mds.yandex.net/i?id=b820b49c4c850aafa15656d3f5fd60f5_l-5277098-images-thumbs&n=13',
		// 		name: 'John Doe',
		// 		age: 25,
		// 	},
		// 	{
		// 		imgSrc: 'https://avatars.mds.yandex.net/i?id=b820b49c4c850aafa15656d3f5fd60f5_l-5277098-images-thumbs&n=13',
		// 		name: 'John Doe',
		// 		age: 25,
		// 	},
		// 	{
		// 		imgSrc: 'https://avatars.mds.yandex.net/i?id=b820b49c4c850aafa15656d3f5fd60f5_l-5277098-images-thumbs&n=13',
		// 		name: 'John Doe',
		// 		age: 25,
		// 	},
		// 	{
		// 		imgSrc: 'https://avatars.mds.yandex.net/i?id=b820b49c4c850aafa15656d3f5fd60f5_l-5277098-images-thumbs&n=13',
		// 		name: 'John Doe',
		// 		age: 25,
		// 	},
		// ];
	}
}
