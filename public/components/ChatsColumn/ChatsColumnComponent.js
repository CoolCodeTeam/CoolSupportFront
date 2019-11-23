import BaseComponent from "../baseComponent";
import {data, bus, router} from "../../main";
import ChatsBlockComponent from "./ChatsBlock/ChatsBlockComponent";
import WrkSpacesBlockComponent from "./WrkSpacesBlock/WrkSpacesBlockComponent";
import UserComponent from "./User/UserComponent";
const chatsColumnTemplate = require('./chatsColumn.pug');

import './bemAllChats/bem-all-chats.css';
import './bemAllChats/bemAllChatsScrollWindow/bem-all-chats-window.css';
import './Message/bemChatBlock/bem-chat-block.css';
import './WrkSpacesBlock/WrkSpace/bemWrkspaceBlock/bem-wrkspace-block.css';
import './WrkSpacesBlock/WrkSpace/bemWrkspaceBlock/bemWrkscpaceVisibleBlock/bem-wrkspace-visible.css';
import './WrkSpacesBlock/WrkSpace/bemWrkspaceBlock/bemWrkspaceExpandableBlock/bem-wrkspace-expandable.css';
import './WrkSpacesBlock/WrkSpace/bemWrkspaceBlock/bemWrkspaceExpandableBlock/bemWrkspaceChannBlock/bem-wrkspace-chann.css';
import './User/bemUserFoundBlock/bem-user-found.css';
import './bemSearchMenu/bem-search-menu.css';
import UsersFoundBlockComponent from "./usersFoundBlock/UsersFoundBlockComponent";
import MessagesFoundBlockComponent from "./messagesFoundBlock/MessagesFoundComponent";

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