import {data} from "../main";
import {userWebSocketOnMessage} from "../handlers/webSocketHandlers";

function getSupportChat() {


}

function userWebsocket(chatId) {

    const websocketConn = new WebSocket(`ws://${backend}${backendPort}/chats/${chatId}/notifications`);
    data.addUserSocketConn(websocketConn);

    websocketConn.onopen = () => {
        console.log('opened webSocket connection');
    };

    websocketConn.onmessage = (event) => userWebSocketOnMessage(event);

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

export {userWebsocket};