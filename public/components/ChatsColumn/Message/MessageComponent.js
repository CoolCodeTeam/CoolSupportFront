import BaseComponent from "../../baseComponent";
import {data, bus, router} from "../../../main";
const msgTempl = require('./message.pug');

class MessageComponent extends BaseComponent {

	render() {
		const message = document.createElement('div');
		message.className = 'chat-block chat-block_style';
		message.innerHTML = msgTempl({id: this._data.ID});
		message.id = "chat-" + this._data.ID;
		return message;
	}
}

export default MessageComponent;