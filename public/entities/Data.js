class Data {

    constructor(isSupport, loggedIn, user = {} , userChats = [],
                currentChatId, currentChat = {}, currentChatUser = {},  currentChatMessages = [], userSocketConn,
                webSocketConns = [], socketConnection = false,
               ) {
        if (Data.__instance) {
            return Data.__instance;
        }

        this.isSupport = isSupport;
        this.user = user;
        this.loggedIn = loggedIn;
        this.userChats = userChats;

        this.currentChatId = currentChatId;
        this.currentChat = currentChat;
        this.currentChatUser = currentChatUser;
        this.currentChatMessages = currentChatMessages;

        this.webSocketConns = webSocketConns;
        this.userSocketConn = userSocketConn;
        this.socketConnectionOn = socketConnection;

        Data.__instance = this;
    }

    clear() {

        this.user = undefined;
        this.isSupport = undefined;
        this.userChats = [];
        this.loggedIn = undefined;

        this.currentChatId = undefined;
        this.currentChat = undefined;
        this.currentChatUser = undefined;
        this.currentChatMessages = [];

        this.webSocketConns = [];
        this.socketConnectionOn = false;

    }

    createLogMessage(method, dataname, data) { //TODO: log module!
        if (method === 'get') {
            console.log(`returning ${dataname} : ${data} from Data storage`);
        }
        if (method === 'set') {
            console.log(`placing ${dataname} : ${data} in Data storage`);
        }
    }

    getUser() {
        this.createLogMessage('get', 'user', this.user);
        return this.user;
    }

    getUserId() {
        this.createLogMessage('get', 'userId', this.user.id);
        return this.user.id;
    }

    setUser(user) {
        this.user = user;
        this.loggedIn = true;
        this.createLogMessage('set', 'user', user);
    }

    getLoggedIn() {
        this.createLogMessage('get', 'loggedIn', this.loggedIn);
        return this.loggedIn;
    }

    setLoggedIn(loggedIn) {
        this.loggedIn = loggedIn;
        this.createLogMessage('set', 'loggedIn', loggedIn);
    }

    getIsSupport() {
        this.createLogMessage('get', 'isSupport', this.isSupport);
        return this.isSupport;
    }

    setIsSupport(isSupport) {
        this.isSupport = isSupport;
        this.createLogMessage('set', 'isSupport', isSupport);
    }

    getUserChats() {
        this.createLogMessage('get', 'userChats', 'some chats');
        return this.userChats;
    }

    setUserChats(userChats) {
        if (userChats) this.userChats = userChats;
        this.createLogMessage('set', 'userChats', userChats);
    }


    setCurrentChatId(currentChatId) {
        this.currentChatId = currentChatId;
        this.createLogMessage('set', 'currentChatId', currentChatId);
        this.setCurrentChat(currentChatId);
    }

    getCurrentChatId() {
        this.createLogMessage('get', 'currentChatId', this.currentChatId);
        return this.currentChatId;
    }

    setCurrentChat(currentChatId) {
        for (let chat of this.userChats) {
            if (chat.ID == currentChatId) {
                this.currentChat = chat;
                break;
            }
        }
        this.createLogMessage('set', 'currentChat', this.currentChat);
    }

    getCurrentChat() {
        this.createLogMessage('get', 'currentChat', this.currentChat);
        return this.currentChat;
    }

    setCurrentChatUser(currentChatUser) {
        this.currentChatUser = currentChatUser;
        this.createLogMessage('set', 'currentChatUser', currentChatUser);
    }

    getCurrentChatUser() {
        this.createLogMessage('get', 'currentChatUser', this.currentChatUser);
        return this.currentChatUser;
    }

    getCurrentChatUserId() {
        this.createLogMessage('get', 'currentChatUserId', this.currentChatUser.id);
        return this.currentChatUser.id;
    }


    setCurrentChatMessages(currentChatMessages) {
        this.currentChatMessages = currentChatMessages;
        this.createLogMessage('set', 'currentChatMessages', currentChatMessages);
    }

    getCurrentChatMessages() {
        this.createLogMessage('get', 'currentChatMessages', this.currentChatMessages);
        return this.currentChatMessages;
    }

    addWebSocketConn(chatId, conn) {
        this.webSocketConns.push({ chatId: chatId,
            connection : conn});
    }

    addUserSocketConn(conn) {
        this.userSocketConn = conn;
    }

    checkWebsocketConn(chatId) {
        for (let conn of this.webSocketConns) {
            if (conn.chatId == chatId) {
                return true;
            }
        };
        return false;
    }

    setSocketConnection(socketConn) {
        this.socketConnectionOn = socketConn;
        this.createLogMessage('set', 'socketConnectionOn', socketConn);
    }

    getSocketConnection() {
        this.createLogMessage('get', 'socketConnectionOn', this.socketConnectionOn);
        return this.socketConnectionOn;
    }


    getChatIdByChatUserId(userId) {
        let chatId = null;
        for (let chat of this.userChats) {
            let otherId;
            if (chat["Members"][0] == this.user.id) {
                otherId = chat["Members"][1];
            } else {
                otherId = chat["Members"][0];
            }
            if (otherId == userId) {
                chatId = chat.ID;
                break;
            }
        }
        this.createLogMessage('get', 'chatId by UserId', chatId);
        return chatId;
    }

    getChatUserIdByChatId(chatId) {
        let userId = null;
        for (let chat of this.userChats) {
            if (chatId == chat.ID) {
                if (chat["Members"][0] == this.user.id) {
                    userId = chat["Members"][1];
                } else {
                    userId = chat["Members"][0];
                }
                break;
            }
        }
        this.createLogMessage('get', 'userId by chatId', userId);
        return userId;
    }

    getChatUsersIds() {
        const ids = [];
        this.userChats.forEach((chat) => {
            if (chat["Members"][0] == this.user.id) {
                ids.push(chat["Members"][1]);
            } else {
                ids.push(chat["Members"][0]);
            };
        });
        return ids;
    }

    getChatUsersWChatIDs() {
        const ids = [];
        this.userChats.forEach((chat) => {
            if (chat["Members"][0] == this.user.id) {
                ids.push({userId: chat["Members"][1],
                    chatId : chat.ID});
            } else {
                ids.push({userId: chat["Members"][0],
                    chatId : chat.ID});
            };
        });
        return ids;
    }

}

export default Data;