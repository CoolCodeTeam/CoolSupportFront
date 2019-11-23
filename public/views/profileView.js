import BaseView from "./baseView";
import ProfilePageComponent from "../components/ProfilePage/profilePageComponent";
import BasicsComponent from "../components/Basics/basicsComponent";
import ChatsColumnComponent from "../components/ChatsColumn/ChatsColumnComponent";
import ChatComponent from "../components/ChatBlock/ChatComponent";
import {createChatBlockHndlr} from "../handlers/chatsBlockHandlers";
import {checkLogin} from "../backendDataFetchers/auth";
import {creatingChats} from "../backendDataFetchers/websockets";
import {componentsStorage, router, data} from "../main";


class profileView extends BaseView {
    constructor (data, parent) {
        super ({viewType: "profile", user:{}, wrkSpaces:[], chats: [], loggedIn: null}, parent);
    };

    setEvents() {
        createChatBlockHndlr();
    }


    setContent() {
        this._data.user = data.getUser();
        this._data.loggedIn = data.getLoggedIn();
        this._data.chats = data.getUserChats();
    }

    show() {
        checkLogin().then(()=>{
            if (!data.getLoggedIn()) router.go('mainPageView');
            else {
                creatingChats(this._parent).then(() => {
                    this.setContent();
                    this.render();
                    this.setEvents();
                });
            }
        });
        console.log('show: profile');
    }

    // drawLeftColumn() {
    //     let leftColumn = new ChatsColumnComponent(this._data, this._parent);
    //     this._parent.querySelector('.column_left').innerHTML = leftColumn.render();
    //     leftColumn.renderChatsContent();
    //     componentsStorage.setLeftColumn(leftColumn);
    // }

    // drawRightColumn(profileBlock) {
    //     this._parent.querySelector('.main').innerHTML = profileBlock.render();
    // }

    drawBasics() {
        let basics = new BasicsComponent(this._data, this._parent);
        this._parent.innerHTML = basics.render();
    }

    drawLeftColumn() {
        let leftColumn = new ChatsColumnComponent(this._data, this._parent);
        this._parent.querySelector('.column.column_left.column_left-outlined').innerHTML += leftColumn.render();
        leftColumn.renderChatsContent();
    }

    render() {
        // let profileBlock = componentsStorage.getRightColumn();
        // if (!profileBlock || !(profileBlock instanceof ProfilePageComponent)) {
        //     this.drawLeftColumn();
        //     profileBlock = new ProfilePageComponent(this._data.user, this._parent);
        // }
        // this.drawRightColumn(profileBlock);
        this.drawBasics();
        this.drawLeftColumn();
        console.log(this._data.chats);
        let profile = new ProfilePageComponent(this._data, this._parent);
        this._parent.querySelector('.column.column_right.column_right-outlined').innerHTML += profile.render();
    }

}

export default profileView;