import { Compounder } from '@VDOM/Compounder';
import HeaderMain from '@compound/headerMain/headerMain';
import NavMenu from '@compound/navMenu/navMenu';
import { VChatMessage } from '@ui/chat/message/chatMessage';
import { VChatHeader } from '@ui/chat/header/header';
import { VChatInput } from '@ui/chat/input/input';
import { VUserItem } from '@ui/chat/userItem/userItem';
import { VStartMessage } from '@ui/chat/startMessage/startMessage';
import api from '@network';
import Notification from '@notification';
import store from '@store';
import { VChatMobileToggle } from '@ui/chat/chatMobileToggle/chatMobileToggle';
import BasePage from '../BasePage';

export default class MessagePage extends BasePage {
	private components: Array<HeaderMain | NavMenu>;

	private contentWrapper: HTMLElement;

	private chatAreaCompounder: Compounder = new Compounder();

	private messageAreaCompounder: Compounder = new Compounder();

	private usersListCompounder: Compounder = new Compounder();

	private currentChatWS: WebSocket | null = null;

	private notificationWS: WebSocket | null = null;

	constructor(parentElement: HTMLElement) {
		super(parentElement);

		this.contentWrapper = document.createElement('div');
		this.contentWrapper.className = 'mainContent';

		this.components = [
			new HeaderMain(parentElement),
			new NavMenu(this.contentWrapper),
		];
	}

	private startChatWS(chatId: number, callback: (response) => {}) {
		this.currentChatWS = new WebSocket(`${api.WS_CHAT_URL}/${chatId}`);
		store.setState('currentChatWS', this.currentChatWS);

		this.currentChatWS.onopen = () => { console.log('ChatWS created!'); };
		this.currentChatWS.onmessage = callback;
		this.currentChatWS.onclose = (event) => {
			console.log(event);
			if (event.code === 1006) {
				this.rerender();
				store.update('profileName');
				store.update('ava');
				store.update('premiumBorder');
				store.update('isAdmin');
				store.update('isPremium');
			}
		};
	}

	async render(): Promise<void> {
		this.chatAreaCompounder.delete();
		this.usersListCompounder.delete();

		this.contentWrapper.innerHTML = '';
		this.components[0].render();
		this.parentElement.appendChild(this.contentWrapper);
		this.components[1].render();

		if (this.notificationWS) {
			this.notificationWS.close();
		}

		this.chatAreaCompounder.clear();
		this.chatAreaCompounder.add(new VStartMessage());

		this.usersListCompounder.clear();
		this.usersListCompounder.down('usersListMobileToggle');
		this.usersListCompounder.add(new VChatMobileToggle());
		this.usersListCompounder.up();

		this.usersListCompounder.down('usersList', `
            display: flex;
            flex-direction: column;
            gap: 10px;
            overflow: auto;
            scrollbar-width: none;
			height: 100%;
			background-color: rgba(255, 255, 255, 0.98);
			backdrop-filter: blur(10px);
			-webkit-backdrop-filter: blur(10px);
			border-radius: 12px;
			padding: 15px;
			box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
			border: 1px solid rgba(0, 0, 0, 0.05);
        `);

		const { success, data: usersList } = await this.getUsersList();

		if (!success) {
			const notification = new Notification({
				headTitle: 'Ошибка сети',
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

		this.chatAreaCompounder.addTo(this.contentWrapper);
		if (usersList.length != 0) this.usersListCompounder.addTo(this.contentWrapper);
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
		if (this.currentChatWS) {
			this.currentChatWS.close(4000, 'manual');
			this.currentChatWS = null;
		}

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
			profileName,
			profileDescription
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

		this.startChatWS(chatId, (response) => {
			const data = JSON.parse(response.data);

			if (data.type === 'init_messages') {
				let len = data.messages;
				if (!len) { len = 0; } else { len = data.messages.length; }

				for (let i = len - 1; i >= 0; --i) {
					const message = data.messages[i];
					this.messageAreaCompounder.add(new VChatMessage(
						message.text,
						message.senderid === (store.getState('myID') as number)
					));
				}

				this.currentChatWS?.send(JSON.stringify({
					type: 'read',
					payload: {
						chat_id: chatId,
					}
				}));

				this.chatAreaCompounder.render(this.contentWrapper);
			}

			if (data.type === 'created') { }

			if (data.type === 'new_messages') {
				for (let i = data.messages.length - 1; i >= 0; --i) {
					const message = data.messages[i];
					if (message.status !== 1) {
						continue;
					}

					this.messageAreaCompounder.addToStart(new VChatMessage(
						message.text,
						message.senderid === (store.getState('myID') as number)
					));
				}

				this.currentChatWS?.send(JSON.stringify({
					type: 'read',
					payload: {
						chat_id: chatId,
					}
				}));

				const textarea1 = document.querySelector<HTMLTextAreaElement>('.chatInput[data-chat-id="2"] textarea');
				const text = textarea1?.value;
				const savedStart = textarea1?.selectionStart;
				const savedEnd = textarea1?.selectionEnd;

				this.chatAreaCompounder.render(this.contentWrapper);
				const textarea2 = document.querySelector<HTMLTextAreaElement>('.chatInput[data-chat-id="2"] textarea');
				if (textarea2)
					textarea2.value = text;
				if (typeof savedStart === 'number' && typeof savedEnd === 'number')
					textarea2?.setSelectionRange(savedStart, savedEnd);
				textarea2?.focus();
			}
		});

		const chatInput = new VChatInput(profileId, () => {
			const textArea = chatInput.getDOM()?.querySelector('.chatInput__input textarea') as HTMLTextAreaElement | null;
			if (textArea) {
				const messageContent = textArea.value.trim();

				if (messageContent === '') {
					return;
				}

				textArea.value = '';

				this.currentChatWS?.send(JSON.stringify({
					type: 'create',
					payload: {
						chat_id: chatId,
						user_id: (store.getState('myID') as number),
						content: messageContent,
					}
				}));

				this.messageAreaCompounder.addToStart(new VChatMessage(
					messageContent, true
				));

				store.setState(`${profileId}lastMessage`, messageContent);

				this.chatAreaCompounder.render(this.contentWrapper);
			}
		});

		this.chatAreaCompounder.add(chatInput);
	}

	async getUsersList() {
		const usersList = await api.getChats();

		if (!usersList.success) {
			return { success: false, data: [] };
		}

		if (!usersList.data.chats) {
			return { success: true, data: [] };
		}

		const usersListWithClick = usersList.data.chats.reverse().map((user) => {
			const userItem = new VUserItem(
				api.BASE_URL_PHOTO + user.profilePicture,
				user.profileName,
				user.lastMessage,
				user.isSelf,
				() => {
					const parentElement = userItem.getDOM()?.parentElement;
					if (parentElement) {
						[...parentElement.children].forEach((child) => child.classList.remove('isActive'));
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

				if (parent == undefined) return;
				const element = userItem.getDOM() as HTMLElement;
				parent.insertBefore(element, parent.firstChild);

			});
			return userItem;
		});

		return { success: true, data: usersListWithClick };
	}
}
