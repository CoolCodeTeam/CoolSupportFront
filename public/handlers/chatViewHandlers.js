import {sendingMessage, deletingMessage, editingMessage} from "../backendDataFetchers/messagesInteraction";
import {componentsStorage, data, bus} from "../main";
import {keys} from "../constants/config";



function chooseSendMessageEvent() {
	event.preventDefault();
	sendMessageEvent();
}

function createSendMessageBtnHndlr() {
	const sendBtn = document.querySelectorAll(".input__icon-container__icon")[1];
	sendBtn.addEventListener('click', chooseSendMessageEvent);
}

function createMessageInputHndlr() {
	const messageInput = document.querySelector(".input__text");
	messageInput.addEventListener('keypress', function (event) {
		if (event.which === keys.ENTER) {
			chooseSendMessageEvent(event);
		}
	});
	messageInput.addEventListener('input', growInput.bind(null, messageInput));

}

function growInput(element) {
	element.style.height = element.style.minHeight;
	element.style.height = element.scrollHeight;
}

async function sendMessageEvent() {
	const chatBlock = componentsStorage.getChatBlock();
	const text = chatBlock.getMessageInputData();
	if (text !== '') {
		console.log(`new message : ${text}`);
		chatBlock.setMessageInputData('');
		try {
			const messageId = await sendingMessage(text, '12.04.2019 13:12', data.getCurrentChatId());
			chatBlock.renderOutgoingMessage({id: messageId, author_id : data.getUserId(), text: text, message_time: '12.04.2019 13:12'});

		} catch (error) {
			chatBlock.renderErrorOutgoingMessage({author_id : data.getUserId(), text: text, message_time: '12.04.2019 13:12'});
		}

	}
	componentsStorage.setChatBlock(chatBlock);
}

export {createSendMessageBtnHndlr, createMessageInputHndlr};