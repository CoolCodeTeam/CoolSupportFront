import BaseView from './baseView';
import RegisterComponent from "../components/RegisterBlock/registerComponent";

class loginView extends BaseView {
    constructor (data, parent) {
        super ({viewType: "login", user:{}, loggedIn: null}, parent);
    };
    async createLoginEvent(params = {form: null}) {
        event.preventDefault();
        const emailField = params.form.elements['email'];
        const passwordField = params.form.elements['password'];
        if (passwordField.value === '') {
            emitRegisterError(passwordField, 'Please, input password');
            return;
        }
        if (emailField.value === '') {
            emitRegisterError(emailField, 'Please, input email');
            return;
        }
        if (!validation.validateEmail(emailField.value)) {
            emitRegisterError(emailField, 'Please, input correct email');
            return;
        }
        const result = await login(emailField.value, passwordField.value);
        if (result) {
            bus.emit('showError', null, `.${errorSelector}`, result.message);
            bus.emit('addErrorStyle', null, emailField, `${textSelector}_error`);
            bus.emit('addErrorStyle', null, passwordField, `${textSelector}_error`);
            return null;
        } else {
            bus.emit('hideError', null, `.${errorSelector}`);
            bus.emit('removeErrorStyle', null, emailField, `${textSelector}`);
            bus.emit('removeErrorStyle', null, passwordField, `${textSelector}`);
            router.go('profileView');
        }
    }
    show() {
        this.render();
        const form = document.querySelector('.register-form');
        if (this._data.viewType === 'login') {
            form.addEventListener('submit', createLoginEvent({form: form}));
        }

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