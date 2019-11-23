import BaseView from './baseView';
import {bus, componentsStorage, data, router} from "../main";
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
		data.setIsSupport(1);
    	this._data.user = data.getUser();
    	this._data.loggedIn = data.getLoggedIn();
		this._data.chatUser = data.getCurrentChatUser();
		this._data.chats = data.getUserChats();
		this._data.currentChat = data.getCurrentChat();
		this._data.chatMessages = data.getCurrentChatMessages();
	}

	findUser(chatId) {

			getCurrentChatInfo(chatId).then(() => {
				this.setContent();
				this.render();
				this.setEvents();
			});
	}

	show(args) {
		console.log(args);
		checkLogin().then(()=>{
			if (!data.getLoggedIn()) router.go('mainPageView');
			else {
				creatingChats(this._parent).then(() => {
					this.findUser(args[0]);

				});
			}
		});
		console.log('show: chat');
	}

	drawBasics() {
		let basics = new BasicsComponent(this._data, this._parent);
    	this._parent.innerHTML = basics.render();
	}

	drawLeftColumn() {
		let leftColumn = new ChatsColumnComponent(this._data, this._parent);
    	this._parent.querySelector('.column.column_left.column_left-outlined').innerHTML += leftColumn.render();
    	leftColumn.renderChatsContent();
		componentsStorage.setLeftColumn(leftColumn);
	}

	drawRightColumn() {
		let chatBlock = new ChatComponent(this._data, this._parent);
		this._parent.querySelector('.column.column_right.column_right-outlined').innerHTML += chatBlock.render();
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