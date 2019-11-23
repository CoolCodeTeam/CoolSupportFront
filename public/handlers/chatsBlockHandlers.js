import {data, promiseMaker, router} from "../main";

function createChatBlockHndlr() {
	const messageWindow = document.querySelector('.all-chats-window');
	const chatUsersWChatID = data.getChatUsersWChatIDs();
	chatUsersWChatID.forEach((chat) => {
		const messageBlock = messageWindow.querySelector(`#chat-${chat.userId}`);
		messageBlock.addEventListener('click', chatBlockClickEvent.bind(null, {userId:chat.userId, chatId: chat.chatId}));
	});
}

async function chatBlockClickEvent(params = {userId:null, chatId:null}) {
	await promiseMaker.createPromise('getCurrentChatInfo', params.userId, params.chatId);
	router.go('chatView', params.chatId);
}




export {createChatBlockHndlr};