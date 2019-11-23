import BaseComponent from "../baseComponent";

const rightMsg = require('./msgRight.pug');
const leftMsg = require('./msgLeft.pug');
const deletedMsg = require('./msgDeleted.pug');

import './chatMsg/chat-msg.css';
import './chatMsg/primaryRow/primary-row.css';
import './chatMsg/secondaryRow/secondary-row.css';

class ChatMessageComponent extends BaseComponent {

	messageElement;

	createMessage() {
		this.messageElement = document.createElement('div');
		this.messageElement.className = 'chat-msg';
		this.messageElement.id = `message-${this._data.message.id}`;
	}

	createHandlerRight() {
		const settingsMessageBtn = this.messageElement.querySelector('.primary-row__icon-container');
		settingsMessageBtn.addEventListener('mouseover', createVisibleSettingsMessageBlock);
		settingsMessageBtn.addEventListener('mouseout', createVisibleSettingsMessageBlock);
		settingsMessageBtn.addEventListener('click', createVisibleSettingsMessageBlock);
	}

	renderLeftDeleted() {
		this.messageElement.classList += ' chat-msg_left';
		this.messageElement.innerHTML = deletedMsg();
	}

	renderRightDeleted() {
		this.messageElement.classList += ' chat-msg_right';
		this.messageElement.innerHTML = deletedMsg();
	}

	renderLeft() {
		this.messageElement.classList += ' chat-msg_left';
		this.messageElement.innerHTML = leftMsg(this._data.message);
	}

	renderRight() {
		this.messageElement.classList += ' chat-msg_right';
		this.messageElement.innerHTML = rightMsg(this._data.message);
	}

	renderNotSupport() {
		if (this._data.message) {
			this._data.message.message_time = this._data.message.message_time.split(' ')[1];
			this.createMessage();
			if (this._data.message.is_support == 0) {
					this.renderRight();
				} else {
					this.renderLeft();
				}
			}
			return this.messageElement;
		}


	renderSupport() {
		if (this._data.message) {
			this._data.message.message_time = this._data.message.message_time.split(' ')[1];
			this.createMessage();
			if (this._data.deleted) {
				if (this._data.message.author_id === this._data.user.id) {
					this.renderRightDeleted();
				} else {
					this.renderLeftDeleted();
				}
			} else {
				if (this._data.message.author_id === this._data.user.id) {
					this.renderRight();
					if (this._data.error) {
						this.messageElement.querySelector('.primary-row__text').classList += ' primary-row__text_error';
					}
					this.createHandlerRight();

				} else {
					this.renderLeft();
				}
				if (this._data.edited) {
					this.messageElement.querySelector('.secondary-row__edited').innerText = 'edited';
				}
			}
			return this.messageElement;
		}
	}


	render() {
		if (data.getIsSupport() == 0) {
			return renderNotSupport();
		} else {
			return renderSupport();
		}
	}
}





export default ChatMessageComponent;