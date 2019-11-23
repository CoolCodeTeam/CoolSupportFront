import BaseComponent from "../../baseComponent";
const TypingBlockTemplate = require('./typingBlock.pug');

import './typing-block.css';
import './messageWindowBlock/message-window.css'
import './inputBlock/input-block.css'
import ChatMessageComponent from "../../Message/ChatMessageComponent";


class TypingBlockComponent extends BaseComponent {

    contentListRootSelector = '.msgwindow-container__msgwindow';

    getMessageInputData() {
        return this._parent.querySelector('.input__text').value;
    }

    setMessageInputData(inputData) {
        this._parent.querySelector('.input__text').value = inputData;
    }

    renderMessage(message) {
        const contentListRoot = this._parent.querySelector(this.contentListRootSelector);
        const messageComponent = new ChatMessageComponent({message: message, user: this._data.user, error: false, deleted:false}, contentListRoot);
        contentListRoot.appendChild(messageComponent.render());
        contentListRoot.scrollTop = contentListRoot.scrollHeight - contentListRoot.clientHeight;
    }

    render() {
        return TypingBlockTemplate(this._data);
    }
}

export default TypingBlockComponent;