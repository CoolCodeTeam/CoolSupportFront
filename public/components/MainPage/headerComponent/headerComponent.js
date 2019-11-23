import BaseComponent from "../../baseComponent";
const HeaderChatTemplate = require('./headerChat.pug');

import './header-chat.css';

class HeaderChatComponent extends BaseComponent {

    render() {
        return HeaderChatTemplate(this._data);
    }
}

export default HeaderChatComponent;