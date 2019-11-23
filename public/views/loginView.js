import BaseView from './baseView';
import RegisterComponent from "../components/RegisterBlock/registerComponent";
import {createRegisterForm} from "../handlers/registerFormHandlers";
import {bus, componentsStorage, data} from "../main";


class loginView extends BaseView {
    constructor (data, parent) {
        super ({viewType: "login", user:{}, loggedIn: null}, parent);
    };
    show() {
        this.render();
        const form = document.querySelector('.register-form');
        createRegisterForm('login');
    }

    render() {
        let login = new RegisterComponent(this._data, this._parent);
        this._parent.querySelector('.main').innerHTML += login.render();
        componentsStorage.clear();
    }

}

export default loginView;