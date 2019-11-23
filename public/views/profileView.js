import BaseView from "./baseView";
import ProfilePageComponent from "../components/ProfilePage/profilePageComponent";
import BasicsComponent from "../components/Basics/basicsComponent";

class profileView extends BaseView {
    constructor (data, parent) {
        super ({viewType: "profile", user:{}, wrkSpaces:[], chats: [], loggedIn: null}, parent);
    };

    // setEvents() {
    //     getProfilePhoto(data.getUserId());
    //     this.createClickablePic();
    //     createChatBlockHndlr();
    //     createSearchInputHndlr();
    //     createWrkspaceBlockExpandHndlr();
    //     createWorkspaceButtonHndlr();
    //     createWrkspaceBlockHndlr();
    //     channelViewHandler();
    // }


    setContent() {
        this._data.user = data.getUser();
        this._data.loggedIn = data.getLoggedIn();
        this._data.chats = data.getUserChats();
        this._data.wrkspaces = data.getUserWrkSpaces();
    }

    show() {
        // promiseMaker.createPromise('checkLogin', this._parent).then(() => {
        //     if (!data.getLoggedIn()) router.go('mainPageView');
        //     else {
        //         creatingChats(this._parent).then(() => {
        //             this.setContent();
        //             this.render();
        //             this.setEvents();
        //         });
        //     }
        // });
        console.log('show: profile');
        this.render();
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

    render() {
        // let profileBlock = componentsStorage.getRightColumn();
        // if (!profileBlock || !(profileBlock instanceof ProfilePageComponent)) {
        //     this.drawLeftColumn();
        //     profileBlock = new ProfilePageComponent(this._data.user, this._parent);
        // }
        // this.drawRightColumn(profileBlock);
        this.drawBasics();
        let profile = new ProfilePageComponent(this._data, this._parent);
        this._parent.querySelector('.column.column_right.column_right-outlined').innerHTML += profile.render();
    }

}

export default profileView;