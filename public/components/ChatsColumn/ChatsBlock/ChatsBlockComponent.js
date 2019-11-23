import BaseComponent from "../../baseComponent";
import {data, bus, router} from "../../../main";
import MessageComponent from "../Message/MessageComponent";
const ChatsBlockTemplate = require('./chatsBlock.pug');

import './bemChatsBlock/bem-chats-block.css';

class ChatsBlockComponent extends BaseComponent {
    contentListRootSelector = '.chats-block__content';

    render() {
    	return ChatsBlockTemplate(this._data);
    }

    renderContent() {
    	const contentListRoot = this._parent.querySelector(this.contentListRootSelector);
    	if (this._data.chats) {
    		this._data.chats.forEach((chat) => {
    			const message = new MessageComponent(chat, contentListRoot);
    			const messageElement = message.render();
    			contentListRoot.appendChild(messageElement);
    			//const id = data.getChatUserIdByChatId(chat.ID);
    		});
    	}
    }
}

export default ChatsBlockComponent;