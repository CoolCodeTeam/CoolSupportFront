import {data, promiseMaker, router} from "../main";

function createChatBlockHndlr() {
	const messageWindow = document.querySelector('.all-chats-window');
	const chatUsersWChatID = data.getUserChats();
	chatUsersWChatID.forEach((chat) => {
		const messageBlock = messageWindow.querySelector(`#chat-${chat.ID}`);
		messageBlock.addEventListener('click', chatBlockClickEvent.bind(null, {chatId: chat.ID}));
	});
}

async function chatBlockClickEvent(params = {chatId:null}) {
	router.go('chatView', params.chatId);
}




export {createChatBlockHndlr};