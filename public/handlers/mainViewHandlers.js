import {keys} from "../constants/config";
import {componentsStorage, data} from "../main";
import {sendingMessage} from "../backendDataFetchers/messagesInteraction";

function chooseSendMessageEventSupport() {
    event.preventDefault();
    sendMessageEventSupport();
}

function createSendMessageBtnHndlrSupport() {
    const sendBtn = document.querySelectorAll(".support-input__icon-container__icon")[1];
    sendBtn.addEventListener('click', chooseSendMessageEventSupport);
}

function createMessageInputHndlrSupport() {
    const messageInput = document.querySelector(".support-input__text");
    messageInput.addEventListener('keypress', function (event) {
        if (event.which === keys.ENTER) {
            chooseSendMessageEventSupport(event);
        }
    });
    messageInput.addEventListener('input', growInputSupport.bind(null, messageInput));

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
            const messageId = await sendingMessage(text, '', data.getCurrentChatId());
        } catch (error) {

        }

    }
    componentsStorage.setMainPageColumn(mainPage);
}

export {createSendMessageBtnHndlrSupport,createMessageInputHndlrSupport }