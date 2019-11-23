import BaseComponent from "../baseComponent";
import {data, bus, router} from "../../main";
import ChatsBlockComponent from "./ChatsBlock/ChatsBlockComponent";
const chatsColumnTemplate = require('./chatsColumn.pug');

import './bemAllChats/bem-all-chats.css';
import './bemAllChats/bemAllChatsScrollWindow/bem-all-chats-window.css';
import './Message/bemChatBlock/bem-chat-block.css';

class ChatsColumnComponent extends BaseComponent {

    contentListRootSelector = '.all-chats-window';

    renderChatsContent() {
    	const contentListRoot = this._parent.querySelector(this.contentListRootSelector);
    	const chatsBlock = new ChatsBlockComponent(this._data, contentListRoot);
    	contentListRoot.innerHTML += chatsBlock.render();
    	chatsBlock.renderContent();
    }

    render() {
    	return chatsColumnTemplate(this._data.user);
    }
}

export default ChatsColumnComponent;