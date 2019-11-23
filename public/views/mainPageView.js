import BaseView from './baseView';
import MainPageComponent from "../components/MainPage/mainPageComponent";

class mainPageView extends BaseView {
    constructor (data, parent) {
        super ({viewType: "mainPage", loggedIn: null}, parent);
    };

    setContent() {
    }

    show() {
        this.render();
    }

    render() {
        let mainPage = new MainPageComponent(this._data, this._parent);
        this._parent.querySelector('.main').innerHTML += mainPage.render();
        mainPage.renderContent();
    }
}

export default mainPageView;
