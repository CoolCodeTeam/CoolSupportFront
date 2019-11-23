import {keys} from "../constants/config";
import {componentsStorage, data} from "../main";
import {sendingMessage} from "../backendDataFetchers/messagesInteraction";

function chooseSendMessageEventSupport() {
    event.preventDefault();
    sendMessageEvent();
}

function createSendMessageBtnHndlrSupport() {
    const sendBtn = document.querySelectorAll(".input__icon-container__icon")[1];
    sendBtn.addEventListener('click', chooseSendMessageEvent);
}

function createMessageInputHndlrSupport() {
    const messageInput = document.querySelector(".input__text");
    messageInput.addEventListener('keypress', function (event) {
        if (event.which === keys.ENTER) {
            chooseSendMessageEvent(event);
        }
    });
    messageInput.addEventListener('input', growInput.bind(null, messageInput));

}

function growInputSupport(element) {
    element.style.height = element.style.minHeight;
    element.style.height = element.scrollHeight;
}

async function sendMessageEventSupport() {
    const mainPage = componentsStorage.getMainPage();
    const text = mainPage.getMessageInputData();
    if (text !== '') {
        console.log(`new message : ${text}`);
        mainPage.setMessageInputData('');
        try {
            const messageId = await sendingMessage(text, date.getDate(), data.getCurrentChatId());
        } catch (error) {

        }

    }
    componentsStorage.setChatBlock(chatBlock);
}