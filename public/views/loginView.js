import BaseView from './baseView';
import RegisterComponent from "../components/RegisterBlock/registerComponent";

class loginView extends BaseView {
    constructor (data, parent) {
        super ({viewType: "login", user:{}, loggedIn: null}, parent);
    };

    show() {
        this.render();
        //bus.emit('createRegisterForm', null, this._data.viewType);
    }
    // drawBasics() {
    //     let basics = new BasicsComponent(this._data, this._parent);
    //     this._parent.innerHTML = basics.render();
    //     clickSupport();
    // }
    render() {
        //this.drawBasics();
        let login = new RegisterComponent(this._data, this._parent);
        this._parent.querySelector('.main').innerHTML += login.render();
    }
}

export default loginView;