import BaseComponent from "../../baseComponent";
const TypingBlockTemplate = require('./typingBlock.pug');

import './typing-block.css';
import './messageWindowBlock/message-window.css'
import './inputBlock/input-block.css'


class TypingBlockComponent extends BaseComponent {

    render() {
        return TypingBlockTemplate(this._data);
    }
}

export default TypingBlockComponent;