import BasePage from '../BasePage';
import { Compounder } from '@modules/VDOM/Compounder';
import HeaderMain from '@compound/headerMain/headerMain';
import NavMenu from '@compound/navMenu/navMenu';
import { VChatMessage } from '@VDOM/simple/chat/message/chatMessage';
import { VChatHeader } from '@VDOM/simple/chat/header/header';
import { VChatInput } from '@VDOM/simple/chat/input/input';
import { VUserItem } from '@VDOM/simple/chat/userItem/userItem';
import { VStartMessage } from '@VDOM/simple/chat/startMessage/startMessage';
import api from '@network';
import Notification from '@simple/notification/notification';
import store from '@store';

export default class MessagePage extends BasePage {
	private components: Array<HeaderMain | NavMenu>;
	private contentWrapper: HTMLElement;
	private chatAreaCompounder: Compounder = new Compounder;
	private messageAreaCompounder: Compounder = new Compounder;
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

		this.usersListCompounder.clear();
		this.usersListCompounder.down('usersList', `
			display: flex;
			flex-direction: column;
			gap: 10px;
			overflow: auto;
			scrollbar-width: none;
			height: 690px;
		`);

		const { success, data: usersList } = await this.getUsersList();

		if (!success) {
			const notification = new Notification({
				headTitle: "Ошибка сети",
				title: 'Не получилось получить список чатов',
				isWarning: false,
				isWithButton: true,
			});
			notification.render();
			return;
		}

		usersList.forEach((user: VUserItem) => {
			this.usersListCompounder.add(user);
		});

		this.contentWrapper.innerHTML = '';
		this.components[0].render();
		this.parentElement.appendChild(this.contentWrapper);
		this.components[1].render();

		this.chatAreaCompounder.addTo(this.contentWrapper);
		this.usersListCompounder.addTo(this.contentWrapper);

		store.update('profileName');
		store.update('ava');
	}

	public getNavMenu(): NavMenu {
		return this.components[1] as NavMenu;
	}

	async createChat(
		chatId: number,
		profilePicture: string,
		profileName: string,
		profileDescription: string,
		profileId: number
	) {
		this.chatAreaCompounder.clear();
		this.messageAreaCompounder.clear();

		this.chatAreaCompounder.down('chatMessages', `
			display: flex;
			flex-direction: column;
			gap: 10px;
			height: 710px;
		`);

		const chatHeader = new VChatHeader(
			api.BASE_URL_PHOTO + profilePicture,
			profileName, profileDescription
		);
		this.chatAreaCompounder.add(chatHeader);

		this.messageAreaCompounder.down('allMessages', `
			display: flex;
			flex-direction: column-reverse;
			gap: 10px;
			flex-grow: 1;
			overflow: auto;
			scrollbar-width: none;
		`);

		this.chatAreaCompounder.add(this.messageAreaCompounder);

		const ws = new WebSocket(`${api.WS_URL}/${chatId}`);

		ws.onopen = () => {
			console.log('WebSocket connection opened');
		};

		ws.onclose = () => {
			console.log('WebSocket connection closed');
		};

		ws.onmessage = (response) => {
			const data = JSON.parse(response.data);
			console.log('store.getState("myID")', store.getState("myID"))
			console.log('message', data);
			if (data.type === 'init_messages') {
				for (let i = data.messages.length - 1; i >= 0; --i) {
					const message = data.messages[i];
					this.messageAreaCompounder.add(new VChatMessage(
						message.text,
						message.senderid === (store.getState("myID") as number)
					));
				}

				this.chatAreaCompounder.render(this.contentWrapper);
			}

			if (data.type === 'created') {
				console.log('send');
			}
		};

		const chatInput = new VChatInput(profileId, () => {
			const textArea = chatInput.getDOM()?.querySelector('.chatInput__input textarea') as HTMLTextAreaElement | null;
			if (textArea) {
				if (textArea.value.trim() === '') return;
				console.log(textArea.value.trim());
				ws.send(JSON.stringify({
					type: "create",
					payload: {
						chat_id: chatId,
						user_id: (store.getState("myID") as number),
						content: textArea.value.trim(),
					}
				}));

				this.messageAreaCompounder.addToStart(new VChatMessage(
					textArea.value, true
				));

				store.setState(`${profileId}lastMessage`, textArea.value.trim());

				textArea.value = '';

				this.chatAreaCompounder.render(this.contentWrapper);
			}
		});

		console.log('store', store)
		this.chatAreaCompounder.add(chatInput);
		// this.chatAreaCompounder.render(this.contentWrapper);

	}

	async getUsersList() {
		const usersList = await api.getChats();

		if (!usersList.success) {
			return { success: false, data: [] }
		}

		const usersListWithClick = usersList.data.reverse().map((user) => {
			const userItem = new VUserItem(
				api.BASE_URL_PHOTO + user.profilePicture,
				user.profileName,
				user.lastMessage,
				user.isSelf,
				() => {
					console.log('user', user)
					const parentElement = userItem.getDOM()?.parentElement;
					if (parentElement) {
						[...parentElement.children].forEach(child => child.classList.remove('isActive'));
					}
					userItem.getDOM()?.classList.add('isActive');

					this.createChat(
						user.chatId,
						user.profilePicture,
						user.profileName,
						user.profileDescription,
						user.profileId
					);
				}
			);
			store.subscribe(`${user.profileId}lastMessage`, (text) => {
				userItem.injectProps({
					avatarSrc: api.BASE_URL_PHOTO + user.profilePicture,
					name: user.profileName,
					isSelf: user.isSelf,
					lastMessage: text,
				});
				userItem.update();

				const parent = userItem.getDOM()?.parentElement as HTMLElement;
				const element = userItem.getDOM() as HTMLElement;
				parent.insertBefore(element, parent.firstChild);

			})
			return userItem;
		});

		return { success: true, data: usersListWithClick };
	}
}
