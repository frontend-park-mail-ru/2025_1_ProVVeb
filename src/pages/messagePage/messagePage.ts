import BasePage from '../BasePage';
import { Compounder } from '@modules/VDOM/Compounder';
import HeaderMain from '@compound/headerMain/headerMain';
import NavMenu from '@compound/navMenu/navMenu';
import { VChatMessage } from '@VDOM/simple/chat/message/chatMessage';
import { VChatHeader } from '@VDOM/simple/chat/header/header';
import { VChatInput } from '@VDOM/simple/chat/input/input';
import { VUserItem } from '@VDOM/simple/chat/userItem/userItem';
import { VStartMessage } from '@VDOM/simple/chat/startMessage/startMessage';

export default class MessagePage extends BasePage {
	private components: Array<HeaderMain | NavMenu>;
	private contentWrapper: HTMLElement;
	private chatAreaCompounder: Compounder = new Compounder;
	private usersListCompounder: Compounder = new Compounder;

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
		this.chatAreaCompounder.clear();
		this.chatAreaCompounder.add(new VStartMessage());
		// this.createChat();

		this.usersListCompounder.clear();
		this.usersListCompounder.down('usersList', `
			display: flex;
			flex-direction: column;
			gap: 10px;
			overflow: auto;
			scrollbar-width: none;
			height: 690px;
		`);

		const usersList = await this.getUsersList();
		usersList.forEach((user) => {
			this.usersListCompounder.add(user);
		});

		this.contentWrapper.innerHTML = '';
		this.components[0].render();
		this.parentElement.appendChild(this.contentWrapper);
		this.components[1].render();

		this.chatAreaCompounder.addTo(this.contentWrapper);
		this.usersListCompounder.addTo(this.contentWrapper);
	}

	public getNavMenu(): NavMenu {
		return this.components[1] as NavMenu;
	}

	async createChat() {
		console.log('this.chatAreaCompounder', this.chatAreaCompounder)
		this.chatAreaCompounder.clear();

		this.chatAreaCompounder.down('chatMessages', `
			display: flex;
			flex-direction: column;
			gap: 10px;
			// height: 100%;
			height: 690px;
		`);

		const chatHeader = new VChatHeader(
			'https://avatars.mds.yandex.net/i?id=b820b49c4c850aafa15656d3f5fd60f5_l-5277098-images-thumbs&n=13',
			'Аня', 'Если тебя зовут не Андрей, то мы не подходим друг другу');

		this.chatAreaCompounder.add(chatHeader);

		this.chatAreaCompounder.down('allMessages', `
			display: flex;
			flex-direction: column-reverse;
			gap: 10px;
			flex-grow: 1;
			overflow: auto;
			scrollbar-width: none;
		`);

		const chatMessages = await this.getChatMessages();
		chatMessages.forEach((message) => {
			this.chatAreaCompounder.add(message);
		});

		this.chatAreaCompounder.up();

		const chatInput = new VChatInput(() => {
			const textArea = chatInput.getDOM()?.querySelector('.chatInput__input textarea') as HTMLTextAreaElement | null;
			if (textArea) {
				if (textArea.value.trim() === '') return; // Если пустое сообщение, ничего не делаем
				// Здесь можно добавить логику отправки сообщения, например, через WebSocket или AJAX-запрос
				console.log(textArea.value.trim());
				textArea.value = '';
			}
		});

		this.chatAreaCompounder.add(chatInput);
		this.chatAreaCompounder.render(this.contentWrapper);

		console.log('this.chatAreaCompounder', this.chatAreaCompounder)
	}

	async getChatMessages() {
		const chatMessage1 = new VChatMessage('Привет, как дела?', true);
		const chatMessage2 = new VChatMessage('Привет, все хорошо, а у тебя?', false);
		const chatMessage3 = new VChatMessage('Отлично, спасибо!', true);

		return [chatMessage1, chatMessage2, chatMessage3];
	}

	async getUsersList() {
		const usersList = [
			{
				avatarSrc: 'https://avatars.mds.yandex.net/i?id=b820b49c4c850aafa15656d3f5fd60f5_l-5277098-images-thumbs&n=13',
				name: 'Аня',
				lastMessage: 'Последнее сообщение привет опа ааа что делать я знаю а ты кто вообще чел лоол',
				isSelf: true,
			},
			{
				avatarSrc: 'https://avatars.mds.yandex.net/i?id=b820b49c4c850aafa15656d3f5fd60f5_l-5277098-images-thumbs&n=13',
				name: 'Аня',
				lastMessage: 'Последнее сообщение привет опа ааа что делать я знаю а ты кто вообще чел лоол',
				isSelf: true,
			},
			{
				avatarSrc: 'https://avatars.mds.yandex.net/i?id=b820b49c4c850aafa15656d3f5fd60f5_l-5277098-images-thumbs&n=13',
				name: 'Аня',
				lastMessage: 'Последнее сообщение привет опа ааа что делать я знаю а ты кто вообще чел лоол',
				isSelf: true,
			},
			{
				avatarSrc: 'https://avatars.mds.yandex.net/i?id=b820b49c4c850aafa15656d3f5fd60f5_l-5277098-images-thumbs&n=13',
				name: 'Аня',
				lastMessage: 'Последнее сообщение привет опа ааа что делать я знаю а ты кто вообще чел лоол',
				isSelf: true,
			},
		];

		const usersListWithClick = usersList.map((user) => {
			const el = new VUserItem(user.avatarSrc, user.name, user.lastMessage, user.isSelf, () => {
				console.log('click');
				el.getDOM()?.classList.toggle('isActive');
				// Динамично удалял у других
				this.createChat();
			});

			return el;
		});

		return usersListWithClick;
	}
}
