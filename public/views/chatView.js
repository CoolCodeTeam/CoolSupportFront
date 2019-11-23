import BaseView from './baseView';

import {data, bus, router, promiseMaker, componentsStorage, appLocalStorage} from "../main";
import {chooseChat, creatingChats, fetchUserInfo} from "../backendDataFetchers/websockets";
import ChatsColumnComponent from "../components/ChatsColumn/ChatsColumnComponent";
import ChatComponent from "../components/ChatBlock/ChatComponent";
import BasicsComponent from "../components/Basics/basicsComponent";
import {
	createCloseSettingsMessageHndlr, createDeleteMessageBlockHndlr, createEditMessageBlockHndlr,
	createMessageInputHndlr,
	createOpenSettingsMessageHndlr,
	createSendMessageBtnHndlr
} from "../handlers/chatViewHandlers";
import {
	channelViewHandler,
	createChatBlockHndlr, createWorkspaceButtonHndlr,
	createWrkspaceBlockExpandHndlr,
	createWrkspaceBlockHndlr
} from "../handlers/chatsBlockHandlers";
import {getCurrentChatInfo} from "../backendDataFetchers/gettingInfo";
import {checkLogin} from "../backendDataFetchers/auth";

class chatView extends BaseView {

	constructor (data, parent) {
    	super ({viewType: "chat", user:{}, loggedIn: null,
			chats: [], currentChat: {},
			chatUser:{}, chatMessages: [],}, parent);
	};

	setEvents() {
		createMessageInputHndlr();
		createChatBlockHndlr();
		createSendMessageBtnHndlr();
	}

	setContent() {
    	this._data.user = data.getUser();
    	this._data.loggedIn = data.getLoggedIn();
		this._data.chatUser = data.getCurrentChatUser();
		this._data.chats = data.getUserChats();
		this._data.currentChat = data.getCurrentChat();
		this._data.chatMessages = data.getCurrentChatMessages();
	}

	findUser(chatId) {
		let chatUser = data.getChatUserIdByChatId(chatId);
		if (chatUser) {
			getCurrentChatInfo(chatUser, chatId).then(() => {
				this.setContent();
				this.render();
				this.setEvents();
			});
		} else {
			router.go('profileView');
		}
	}

	show(...args) {
		checkLogin().then(() => {
			if (!data.getLoggedIn()) router.go('mainPageView');
			creatingChats(this._parent).then(() => {
				this.findUser(args);
			});
		});
		console.log('show: chat page');
	}

	drawBasics() {
		let basics = new BasicsComponent(this._data, this._parent);
    	this._parent.innerHTML = basics.render();
	}

	drawLeftColumn() {
		let leftColumn = new ChatsColumnComponent(this._data, this._parent);
    	this._parent.querySelector('.column_left').innerHTML += leftColumn.render();
    	leftColumn.renderChatsContent();
		componentsStorage.setLeftColumn(leftColumn);
	}

	drawRightColumn() {
		let chatBlock = new ChatComponent(this._data, this._parent);
		this._parent.querySelector('.column_right').innerHTML += chatBlock.render();
		chatBlock.renderContent();
		componentsStorage.setChatBlock(chatBlock);

	}

	render() {
    	this.drawBasics();
    	this.drawLeftColumn();
    	this.drawRightColumn();
	}

}

export default chatView;