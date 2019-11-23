import BaseView from './baseView';
import MainPageComponent from "../components/MainPage/mainPageComponent";
import {componentsStorage, data} from "../main";
import {userWebsocket} from "../backendDataFetchers/ordinaryUser";
import {createMessageInputHndlr, createSendMessageBtnHndlr} from "../handlers/chatViewHandlers";
import {createChatBlockHndlr} from "../handlers/chatsBlockHandlers";
import {createMessageInputHndlrSupport, createSendMessageBtnHndlrSupport} from "../handlers/mainViewHandlers";

class mainPageView extends BaseView {
    constructor (data, parent) {
        super ({viewType: "mainPage", loggedIn: null}, parent);
    };

    setEvents() {
        createSendMessageBtnHndlrSupport();
        createMessageInputHndlrSupport();
    }

    setContent() {
    }

    async show() {
        const chatId = await getSupportChat();
        userWebsocket(chatId);
        data.setIsSupport(0);
        this.render();
        this.setEvents();
    }

    render() {
        let mainPage = new MainPageComponent(this._data, this._parent);
        this._parent.querySelector('.main').innerHTML += mainPage.render();
        mainPage.renderContent();
        componentsStorage.setMainPageColumn(mainPage);
    }
}

export default mainPageView;
