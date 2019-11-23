import {appLocalStorage, bus, data, promiseMaker} from "../main";
import {getChats, getCurrentChatMessages, getUserInfo} from "./gettingInfo";
import {webSocketOnMessage} from "../handlers/webSocketHandlers";
import {settings, responseStatuses, ROUTER} from '../constants/config';
import sendingMessage from "./messagesInteraction";
const {backend} = settings;
const {backendPort} = settings;

function createWebsocketConn(chatId) {
	if (data.checkWebsocketConn(chatId)) {
		return;
	}
	const websocketConn = new WebSocket(`ws://${backend}${backendPort}/chats/${chatId}/notifications`);
	data.addWebSocketConn(chatId, websocketConn);

	websocketConn.onopen = () => {
		console.log('opened webSocket connection');
	};

	websocketConn.onmessage = (event) => webSocketOnMessage(event);

	websocketConn.onclose = (event) => {
		if (event.wasClean) {
			console.log(`webSocket was closed with code : ${event.code}, cause : ${event.reason}`);
		} else {
			console.log(`error occurred, webSocket was closed with code : ${event.code}`);
		}
	};

	websocketConn.onerror = (error) => {
		console.log(`websocket error : ${error.message}`);
		websocketConn.close();
	};

}

async function openWebSocketConnections() {
	if (data.getSocketConnection() === false) {
		const chats = data.getUserChats();
		for (const chat of chats) {
			await createWebsocketConn(chat.ID);
		}
		await data.setSocketConnection(true);
	}
}

async function creatingChats() {
	await getChats(data.getUserId());
	await openWebSocketConnections();

}



export {createWebsocketConn, openWebSocketConnections, creatingChats};