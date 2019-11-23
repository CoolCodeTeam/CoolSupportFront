import BaseComponent from "../baseComponent";
const mainPageTemplate = require('./mainPage.pug');

import './main-page.css';
import HeaderChatComponent from "./headerComponent/headerComponent";
import TypingBlockComponent from "./typingBlock/typingBlockComponent";

class MainPageComponent extends BaseComponent {

    contentListRootSelector = '.main-page__container';
    typingBlock;

    renderNewMessage(message) {
        this.typingBlock.renderMessage(message);
    }

    getMessageInputData() {
        return this.typingBlock.getMessageInputData();
    }

    setMessageInputData(inputData) {
        this.typingBlock.setMessageInputData(inputData);
    }

    renderTypingBlock() {
        const contentListRoot = this._parent.querySelector(this.contentListRootSelector);
        this.typingBlock = new TypingBlockComponent(this._data, contentListRoot);
        contentListRoot.innerHTML+=this.typingBlock.render();
    }

    renderHeader() {
        const contentListRoot = this._parent.querySelector(this.contentListRootSelector);
        const header = new HeaderChatComponent(this._data, contentListRoot);
        contentListRoot.innerHTML+=header.render();
    }

    renderContent() {
        this.renderHeader();
        this.renderTypingBlock();
    }



    render() {
        return mainPageTemplate(this._data);
    }
}

export default MainPageComponent;