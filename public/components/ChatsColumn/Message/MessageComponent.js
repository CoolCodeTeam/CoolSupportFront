import BaseComponent from "../../baseComponent";
import {data, bus, router} from "../../../main";
const msgTempl = require('./message.pug');

class MessageComponent extends BaseComponent {

	render() {
		const message = document.createElement('div');
		message.className = 'chat-block chat-block_style';
		message.innerHTML = msgTempl({id: data.getCurrentChatId()});
		message.id = "chat-" + data.getCurrentChatId();
		return message;
	}
}

export default MessageComponent;