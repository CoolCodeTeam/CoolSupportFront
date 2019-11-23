import {data, FetchModule} from "../main";
import {userWebSocketOnMessage} from "../handlers/webSocketHandlers";
import {API, responseStatuses} from "../constants/config";

async function getSupportChat() {
    console.log(` Getting chat ${id} `);
    try {
        let response = await FetchModule._doGet(
            {path: API.supportChat}
        );
        if (response.status !== 200) {
            throw new Error(
                `Couldn't fetch user chats: ${responseStatuses[response.status]}`);
        }
        let id = await response.json();
        return id;
    } catch (error) {
        console.error(error);
    }


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

export {userWebsocket, getSupportChat};